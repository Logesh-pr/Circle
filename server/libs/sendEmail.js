import { Resend } from "resend";
import { render } from "@react-email/render";

import OTPEmail from "../email/OTPEmail.js";
import "dotenv/config.js";

const resend = new Resend(process.env.RESEND_API_KEY);
// const html = render(OTPEmail());
export async function sendOTPEmail() {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "loki.webdeveloper@gmail.com",
    subject: "hello world",
    react: OTPEmail(),
  });

  if (error) {
    return console.log(error);
  }

  return console.log(data);
}
