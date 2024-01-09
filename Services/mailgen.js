import mailgen from "mailgen";

const emailBody = (email) => {
  var mailGenerator = new mailgen({
    theme: "cerberus",
    product: {
      // Appears in header & footer of e-mails
      name: "Nesterlogistics",
      link: "https://mailgen.js/",
      // Optional logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  // var emailText = mailGenerator.generatePlaintext(email);

  // Generate an HTML email with the provided contents
  return mailGenerator.generate(email);
};

export default emailBody;
