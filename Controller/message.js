import expressAsyncHandler from "express-async-handler";
//files
import emailBody from "../Services/mailgen.js";
import sendEmail from "../Services/sparkpost.js";
import template from "../Utils/template.js";

const message = expressAsyncHandler((req, res) => {
  const message = template(req.body);
  const EmailBody = emailBody(message);
  sendEmail(
    req.body.userMail,
    "Thank for contact NESTERLOGISTIC COMPANY",
    EmailBody,
  );

  res.json({
    success: true,
    message: `message to ${req.body.userMail} successfully`,
  });
});

export default message;
