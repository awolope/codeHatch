import { getToken } from './auth';

export async function verifyAdmin(request) {
  const token = getToken(request);
  if (!token) return false;
  
  // Implement your token verification logic
  // This should match how you handle authentication in your existing system
  const user = await getUserFromToken(token);
  return user?.role === 'admin';
}

export async function requireAdmin(request) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    throw new Error('Unauthorized - Admin access required');
  }
}