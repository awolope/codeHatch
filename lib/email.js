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
      from: `"Techly Tech School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🚀 Welcome to Techly Tech School, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
          
          <h2 style="color: #1a202c; text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 15px;">
            Welcome to Techly Tech School, ${name}! 👋
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
