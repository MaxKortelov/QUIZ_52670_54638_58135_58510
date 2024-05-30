import {EmailOptions} from "../types/services/email.service";
import nodemailer from "nodemailer";
import {nodeMailerOptions} from "../@shared/env-vars";

const connectToTransporter = () => {
  return nodemailer.createTransport({
    service: nodeMailerOptions.service,
    host: nodeMailerOptions.host,
    port: nodeMailerOptions.port,
    secure: nodeMailerOptions.secure,
    auth: {
      user: nodeMailerOptions.user,
      pass: nodeMailerOptions.password
    }
  });
}

export async function sendEmail(emailOptions: EmailOptions): Promise<string> {
  const options = {
    from: {
      name: nodeMailerOptions.mailSenderName,
      address: nodeMailerOptions.mailSender
    },
    ...emailOptions
  }

  const transporter = connectToTransporter();

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function(error, _info){
      transporter.close();
      if (error) {
        return reject("Something went wrong. Message was not sent")
      }
      return resolve("Message was successfully sent")
    });
  })
}