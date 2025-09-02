import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
        rejectUnauthorized: false, // Add this for better error handling
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
    throw error;
  }
};
// Add these functions to your existing email.js file

export const sendPaymentApprovalEmail = async (email, name, courseTitle) => {
  try {
    await transporter.sendMail({
      from: `"Techlyn Tech School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎉 Payment Approved - Access Your ${courseTitle} Course!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
          
          <h2 style="color: #1a202c; text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 15px;">
            Payment Approved! 🎉
          </h2>

          <p style="font-size: 16px; color: #4a5568;">
            Hello <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #4a5568;">
            Your payment for <strong style="color: #4f46e5;">${courseTitle}</strong> has been approved and verified!
          </p>

          <p style="font-size: 16px; color: #4a5568;">
            You now have full access to all course materials. Start your learning journey today!
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: linear-gradient(to right, #047857, #0d9488); color: white; padding: 12px 30px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Access Your Course
            </a>
          </div>

          <div style="background-color: #edf2f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Need Help?</h3>
            <p style="font-size: 14px; color: #4a5568; margin-bottom: 10px;">
              If you have any questions or need assistance with your course:
            </p>
            <ul style="font-size: 14px; color: #4a5568;">
              <li>Email: ${process.env.SUPPORT_EMAIL || 'support@techlynschool.com'}</li>
              ${process.env.SUPPORT_PHONE ? `<li>Phone: ${process.env.SUPPORT_PHONE}</li>` : ''}
            </ul>
            <p style="font-size: 14px; color: #4a5568; margin-top: 10px;">
              <strong>Note:</strong> If you wish to cancel your enrollment, please contact our support team.
            </p>
          </div>

          <p style="font-size: 16px; color: #718096; text-align: center; margin-top: 30px;">
            Happy Learning!<br>
            The Techlyn Tech School Team 🚀
          </p>
        </div>
      `,
    });
    
  } catch (error) {
  
    throw error;
  }
};

export const sendPaymentRejectionEmail = async (email, name, courseTitle) => {
  try {
    await transporter.sendMail({
      from: `"Techlyn Tech School Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `⚠️ Payment Issue - ${courseTitle} Enrollment`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
          
          <h2 style="color: #1a202c; text-align: center; border-bottom: 2px solid #ef4444; padding-bottom: 15px;">
            Payment Review Required ⚠️
          </h2>

          <p style="font-size: 16px; color: #4a5568;">
            Hello <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #4a5568;">
            We encountered an issue with your payment for <strong style="color: #ef4444;">${courseTitle}</strong>.
          </p>

          <p style="font-size: 16px; color: #4a5568;">
            Our team has reviewed your payment and unfortunately, we were unable to verify it successfully.
          </p>

          <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7f1d1d; margin-top: 0;">Next Steps:</h3>
            <p style="font-size: 14px; color: #7f1d1d; margin-bottom: 10px;">
              Please contact our support team to resolve this issue:
            </p>
            <ul style="font-size: 14px; color: #7f1d1d;">
              <li>Email: ${process.env.SUPPORT_EMAIL || 'support@techlynschool.com'}</li>
              ${process.env.SUPPORT_PHONE ? `<li>Phone: ${process.env.SUPPORT_PHONE}</li>` : ''}
            </ul>
            <p style="font-size: 14px; color: #7f1d1d; margin-top: 10px;">
              Please include your payment reference number and any relevant transaction details.
            </p>
          </div>

          <p style="font-size: 16px; color: #4a5568;">
            We're here to help you get enrolled successfully!
          </p>

          <p style="font-size: 16px; color: #718096; text-align: center; margin-top: 30px;">
            Best regards,<br>
            The Techlyn Tech School Support Team 🎓
          </p>
        </div>
      `,
    });
    
  } catch (error) {
  
    throw error;
  }
};
// Add this function to your existing email.js file
export const sendPaymentConfirmationEmail = async (email, name, courseTitle, coursePrice, bankName, paymentReference, transferDate) => {
  try {
    await transporter.sendMail({
      from: `"Techlyn Tech School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📋 Payment Pending - ${courseTitle} Enrollment Pending Verification`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
          
          <h2 style="color: #1a202c; text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 15px;">
            Your Enrollment Request has being Successfully Recorded! 📋
          </h2>

          <p style="font-size: 16px; color: #4a5568;">
            Hello <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #4a5568;">
            Thank you for your payment for <strong style="color: #4f46e5;">${courseTitle}</strong>. We have received your bank transfer details and your enrollment is now pending verification.
          </p>

          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Payment Details:</h3>
            <table style="width: 100%; font-size: 14px; color: #4a5568;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Course:</td>
                <td style="padding: 5px 0;">${courseTitle}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Amount Paid:</td>
                <td style="padding: 5px 0;">$${coursePrice}</td>
              </tr>
              ${bankName ? `
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Bank Name:</td>
                <td style="padding: 5px 0;">${bankName}</td>
              </tr>
              ` : ''}
              ${paymentReference ? `
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Reference No:</td>
                <td style="padding: 5px 0;">${paymentReference}</td>
              </tr>
              ` : ''}
              ${transferDate ? `
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Transfer Date:</td>
                <td style="padding: 5px 0;">${new Date(transferDate).toLocaleDateString()}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background-color: #edf2f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">What Happens Next?</h3>
            <p style="font-size: 14px; color: #4a5568; margin-bottom: 10px;">
              ✅ Our team will verify your payment within 24-48 hours<br>
              ✅ You'll receive another email once your enrollment is approved<br>
              ✅ Then you'll get full access to the course materials
            </p>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Need to Cancel or Have Questions?</h3>
            <p style="font-size: 14px; color: #92400e; margin-bottom: 10px;">
              If this wasn't you, or if you wish to cancel your enrollment, please contact our support team immediately:
            </p>
            <ul style="font-size: 14px; color: #92400e;">
              <li>Email: <a href="mailto:${process.env.SUPPORT_EMAIL || 'support@techlynschool.com'}" style="color: #92400e;">${process.env.SUPPORT_EMAIL || 'support@techlynschool.com'}</a></li>
              ${process.env.SUPPORT_PHONE ? `<li>Phone: ${process.env.SUPPORT_PHONE}</li>` : ''}
            </ul>
            <p style="font-size: 14px; color: #92400e; margin-top: 10px;">
              <strong>Please include your reference number (#${paymentReference || 'Pending'}) in your message.</strong>
            </p>
          </div>

          <p style="font-size: 16px; color: #718096; text-align: center; margin-top: 30px;">
            We're excited to have you in class!<br>
            The Techlyn Tech School Team 🚀
          </p>
        </div>
      `,
    });
  } catch (error) {
    throw error;
  }
};