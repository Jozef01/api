const template = ({ name, introduction, instructions, footer }) => ({
  body: {
    name: `${name}`,
    intro: `${introduction}`,
    // "Welcome to Mailgen! We're very excited to have you on board.",
    action: {
      instructions: `${instructions}`,
      // "To get started with Mailgen, please click here:",
    },
    outro: `${footer}`,
    // "Need help, or have questions? Just reply to this email, we'd love to help.",
  }, // Optionally, preview the generated HTML e-mail by writing it to a local file
});

export default template;
