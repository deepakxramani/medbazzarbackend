const express = require('express');
const router = express.Router();
const db = require('./pool');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Email transporter (use your Gmail or any SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your-email@gmail.com
    pass: process.env.EMAIL_PASSWORD, // Gmail App Password (not your main password)
  },
});

// ─── ROUTE 1: Send OTP ───────────────────────────────────────────
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // 1. Check if user exists in your users table
    const [users] = await db
      .promise()
      .query('SELECT * FROM userdata WHERE emailid = ?', [email]);
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No account found with this email' });
    }

    // 2. Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 3. Set expiry — 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 4. Delete any existing OTP for this email (old ones)
    await db.promise().query('DELETE FROM otp_tokens WHERE email = ?', [email]);

    // 5. Save new OTP in DB
    await db
      .promise()
      .query(
        'INSERT INTO otp_tokens (email, otp, expires_at) VALUES (?, ?, ?)',
        [email, otp, expiresAt],
      );

    // 6. Send email
    await transporter.sendMail({
      from: `"MedBazzar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your MedBazzar Login OTP',
      html: `
        <div style="font-family: Arial; max-width: 400px; margin: auto;">
          <h2 style="color: #2563eb;">MedBazzar Login OTP</h2>
          <p>Your one-time password is:</p>
          <h1 style="letter-spacing: 8px; color: #1d4ed8;">${otp}</h1>
          <p>This OTP expires in <strong>5 minutes</strong>.</p>
          <p style="color: #6b7280; font-size: 12px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// ─── ROUTE 2: Verify OTP ─────────────────────────────────────────
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    // 1. Fetch OTP record
    const [records] = await db
      .promise()
      .query('SELECT * FROM otp_tokens WHERE email = ?', [email]);

    if (records.length === 0) {
      return res
        .status(400)
        .json({ message: 'OTP not found. Please request a new one.' });
    }

    const record = records[0];

    // 2. Check if too many attempts (brute-force protection)
    if (record.attempts >= 3) {
      await db
        .promise()
        .query('DELETE FROM otp_tokens WHERE email = ?', [email]);
      return res
        .status(429)
        .json({ message: 'Too many attempts. Please request a new OTP.' });
    }

    // 3. Check expiry
    if (new Date() > new Date(record.expires_at)) {
      await db
        .promise()
        .query('DELETE FROM otp_tokens WHERE email = ?', [email]);
      return res
        .status(400)
        .json({ message: 'OTP has expired. Please request a new one.' });
    }

    // 4. Check if OTP matches
    if (record.otp !== otp) {
      // Increment attempts
      await db
        .promise()
        .query(
          'UPDATE otp_tokens SET attempts = attempts + 1 WHERE email = ?',
          [email],
        );
      const remaining = 2 - record.attempts;
      return res
        .status(400)
        .json({ message: `Invalid OTP. ${remaining} attempts remaining.` });
    }

    // 5. OTP is correct — delete it (one-time use)
    await db.promise().query('DELETE FROM otp_tokens WHERE email = ?', [email]);

    // 6. Fetch user & generate JWT (same as your existing login)
    const [users] = await db
      .promise()
      .query(
        'SELECT userid, username, emailid, picture FROM userdata WHERE emailid = ?',
        [email],
      );
    const user = users[0];

    const token = jwt.sign(
      { id: user.userid, emailid: user.emailid },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.userid,
        name: user.username,
        email: user.emailid,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ message: 'Verification failed' });
  }
});

module.exports = router;
