import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    minVersion: 'TLSv1.2',
  },
});

export const sendWelcomeEmail = async (email, name, role) => {
  try {
    await transporter.sendMail({
      from: `"Techlyn Tech School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🚀 Welcome to Techly Tech School, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
          
          <h2 style="color: #1a202c; text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 15px;">
            Welcome to Techlyn Tech School, ${name}! 👋
          </h2>

          <p style="font-size: 16px; color: #4a5568; text-align: center;">
            You have successfully joined as a <strong style="color: #4f46e5;">${role}</strong>! 🎉
          </p>

          <p style="font-size: 16px; color: #4a5568;">
            At Techly Tech School, we believe in learning by doing. Whether you're building your first website, creating an app, or mastering advanced AI, our mission is to give you the tools and mentorship you need to succeed.
          </p>

          <div style="background-color: #edf2f7; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="font-size: 18px; font-weight: bold; color: #2d3748;">
              "The best way to predict the future is to create it." – Abraham Lincoln
            </p>
          </div>

          <p style="font-size: 16px; color: #4a5568; text-align: center;">
            Ready to start your journey?<br>
            <a href="${process.env.NEXTAUTH_URL}" style="color: #4f46e5; font-weight: bold;">Access Your Dashboard →</a>
          </p>

          <p style="font-size: 16px; color: #718096; text-align: center; margin-top: 30px;">
            See you in class,<br>
            The Techly Tech School Team 🚀
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
export const sendPasswordResetEmail = async (email, name, resetLink) => {
  try {
    await transporter.sendMail({
      from: `"Techylyn Academy Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔑 Your Techylyn Academy Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #e0e6ed;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #047857; margin: 0; font-size: 24px;">Techylyn<span style="color: #0d9488;">Academy</span></h1>
          </div>
          <h2 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #e0e6ed; padding-bottom: 15px;">
            Hi ${name}, let's reset your password!
          </h2>
          <p style="font-size: 16px; color: #444; text-align: center;">
            We received a request to reset your Techylyn Academy account password.<br>
            Click below to choose a new password:
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetLink}" style="background: linear-gradient(to right, #047857, #0d9488); color: white; padding: 12px 30px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #7f8c8d; text-align: center;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
          <div style="background-color: #e6f0f0; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: #2c3e50;">
              <strong>Security Tip:</strong> Never share your password or this link with anyone.
            </p>
          </div>
          <p style="font-size: 14px; color: #7f8c8d; text-align: center;">
            Best regards,<br>
            The Techylyn Academy Team 🎓
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const sendPasswordResetConfirmation = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `"Techylyn Academy Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Your Techylyn Academy Password Successfully Reset",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #e0e6ed;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #047857; margin: 0; font-size: 24px;">Techylyn<span style="color: #0d9488;">Academy</span></h1>
          </div>
          <h2 style="color: #047857; text-align: center; border-bottom: 2px solid #e0e6ed; padding-bottom: 15px;">
            Password Updated Successfully!
          </h2>
          <p style="font-size: 16px; color: #444; text-align: center;">
            Hi ${name}, your Techylyn Academy password was successfully reset at ${new Date().toLocaleString()}.
          </p>
          <p style="font-size: 16px; color: #444; text-align: center;">
            You can now log in with your new password and continue your learning journey!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/login" style="background: linear-gradient(to right, #047857, #0d9488); color: white; padding: 12px 30px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Login to Your Account
            </a>
          </div>
          <p style="font-size: 14px; color: #7f8c8d; text-align: center;">
            If you didn't make this change, please contact us immediately at:<br>
            <a href="mailto:support@techylynacademy.com" style="color: #0d9488;">support@techylynacademy.com</a>
          </p>
          <p style="font-size: 14px; color: #7f8c8d; text-align: center; margin-top: 30px;">
            Happy Learning!<br>
            The Techylyn Academy Team 🎓
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending password reset confirmation:', error);
    throw error;
  }
};