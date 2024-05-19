import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: 'PhuocDT <onboarding@resend.dev>',
        to: email,
        subject: "Oauth Application Confirm Email",
        html: `Click <a href="${confirmationLink}">here</a> to confirm your email`
    })
}
