import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/user';
import { sendPasswordResetEmail } from '@/lib/email';

const normalizeEmail = (email) => email.trim().toLowerCase();

export async function POST(request) {
  await dbConnect();

  try {
    const { action } = Object.fromEntries(request.nextUrl.searchParams);
    const { email, token, newPassword } = await request.json();

    if (action === 'request') {
      return handlePasswordResetRequest(email);
    } else if (action === 'reset') {
      return handlePasswordReset(token, newPassword);
    } else {
      return NextResponse.json(
        { error: 'Invalid action specified' },
        { status: 400 }
      );
    }
  } catch (error) {
   
    return NextResponse.json(
      { error: 'Error processing password reset request' },
      { status: 500 }
    );
  }
}

async function handlePasswordResetRequest(email) {
  if (!email) {
    return NextResponse.json(
      { error: 'Email is required.' },
      { status: 400 }
    );
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return NextResponse.json(
      { error: 'Email not found in our system' },
      { status: 404 }
    );
  }

  const resetToken = uuidv4();
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
  await sendPasswordResetEmail(normalizedEmail, user.name, resetLink);

  return NextResponse.json({
    message: 'Password reset link sent to your email.',
  });
}

async function handlePasswordReset(token, newPassword) {
  if (!token || !newPassword) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 400 }
    );
  }

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid or expired token.' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({
    message: 'Password reset successful! You can now login.',
  });
}