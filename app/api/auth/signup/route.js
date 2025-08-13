import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/user';
import { sendWelcomeEmail } from '@/lib/email';

const normalizeEmail = (email) => email.trim().toLowerCase();

export async function POST(request) {
  await dbConnect();

  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    // Check if email matches admin email from env
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

    let assignedRole = 'student'; // default role

    if (normalizedEmail === adminEmail) {
      assignedRole = 'admin';
    } else if (role && ['student', 'tutor', 'admin'].includes(role)) {
      // Prevent unauthorized admin creation via role param
      if (role === 'admin') {
        const adminKey = request.headers.get('x-admin-key');
        if (adminKey !== process.env.ADMIN_SIGNUP_KEY) {
          return NextResponse.json(
            { error: 'Unauthorized to create admin account.' },
            { status: 403 }
          );
        }
      }
      assignedRole = role;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: assignedRole,
    });

    await newUser.save();

    await sendWelcomeEmail(normalizedEmail, name, assignedRole); // pass role if needed

    return NextResponse.json(
      {
        message: 'User created successfully!',
        user: { name, email: normalizedEmail, role: assignedRole },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Server error while signing up' },
      { status: 500 }
    );
  }
}
