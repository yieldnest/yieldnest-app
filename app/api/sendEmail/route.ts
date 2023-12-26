import nodemailer from 'nodemailer'
import { type NextRequest } from 'next/server'

// Create transporter for Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // debug: true, // show debug output
  // logger: true, // log information in console  **NEW**
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_NAME,
    pass:  process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  // Destructure the req.body object to access the name, email, and message properties
  const { name, email, message } = await req.json()
  try {
    const res = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_NAME,
      to: 'media@yieldnest.finance',
      replyTo: email,
      subject: `New restaking pool request from ${email}`,
      html: `
      <p>Contact name: ${name} </p>
      <p>Contact email: ${email} </p>
      <p>${message} </p>
      `,
    })
    return Response.json({ status: res.accepted ? 'ok' : 'fail', message: `Your request has been sent. 
    We will respond as soon as we review your request.` })
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json({status: 'fail', message: 'Error sending email' })
  }
}
