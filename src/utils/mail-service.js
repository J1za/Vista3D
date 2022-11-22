import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: process.env.NEXT_PUBLIC_SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS
    }
})