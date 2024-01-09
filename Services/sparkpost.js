import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import sparkPostTransport from "nodemailer-sparkpost-transport";
import keys from "../Config/keys.js";

const sendEmail = expressAsyncHandler(
  async ({ sendTo, Subject, emailBody }) => {
    const sparkPostOptions = {
      sparkPostApiKey: keys.sparkpost_secret,
    };
    const transporter = nodemailer.createTransport(
      sparkPostTransport(sparkPostOptions),
    );

    const msg = {
      from: "support@app.nesterlogistics.com",
      to: sendTo,
      subject: Subject,
      html: emailBody,
    };

    await transporter.sendMail(msg);

    return "Message sent";
  },
);
export default sendEmail;
