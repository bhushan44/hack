const nodemailer = require("nodemailer");
const sendemail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "praveenjeeru68@gmail.com",
      pass: "rzzc tqlj coek uhgw",
    },
  });
  const emailoptions = {
    from: "praveenjeeru68@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(emailoptions);
};
module.exports = { sendemail };
