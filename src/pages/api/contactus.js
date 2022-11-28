import { transporter } from "../../utils/mail-service";

export default async (req, res) => {
    const { email, text, name } = req.body
    try {
        const emailTest = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_SMTP_USER,
            to: 'workinvs@gmail.com, officevista@pec.it',
            subject: `Contact form submission from ${email}`,
            html: `<p style="font-size: 25px; color: black; text-align: center">You have a new <strong style="color: cornflowerblue">Message</strong> from <strong>${name}</strong></p>
             <p style="font-size: 20px; color: black"> ${text ? text : 'Text empty'}</p>`
        })
        res.status(200).json(req.body)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e })
    }
}
