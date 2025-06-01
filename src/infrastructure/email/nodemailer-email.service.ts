import {Injectable} from "@nestjs/common";
const nodemailer = require('nodemailer');
import {EmailPort} from "../../domain/port/email.port";

@Injectable()
export class NodemailerEmailService implements EmailPort {
    async sendConfirmationEmail(email: string, token: string): Promise<void> {
        const confirmationLink = `http://localhost:3000/auth/confirm-email?token=${token}`;

        // Configuration de nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            to: email,
            from: `"Fluenceo" <fluenceo.app@gmail.com>`,
            subject: 'Confirm your Fluenceo account',
            html: `<p>Please confirm your account by clicking <a href="${confirmationLink}">here</a>.</p>`,
        });
    }
}