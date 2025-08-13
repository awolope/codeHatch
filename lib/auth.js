// lib/auth.js
import jwt from 'jsonwebtoken';
import User from './models/user';
import dbConnect from './dbConnect';

export async function getUserFromRequest(request) {
  // works with server-side app router route handler where request is a NextRequest OR fetch request JSON
  // When using app/api route.js, request.headers and cookies are available.
  await dbConnect();
  try {
    // first check cookie
    const token = request.cookies?.get?.('auth_token')?.value || // NextRequest style
                  (request.headers?.get('authorization')?.replace('Bearer ', '') ?? null);
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.email && !decoded?.id) return null;

    const user = await User.findById(decoded.id || decoded.sub) || await User.findOne({ email: decoded.email });
    if (!user) return null;
    return user;
  } catch (err) {
    return null;
  }
}
