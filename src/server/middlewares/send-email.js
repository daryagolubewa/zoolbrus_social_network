const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const sendEmail = (req, signup) => {
  if (signup) {
    const msg = {
      to: req.body.email,
      from: 'info@zoolbrus.com',
      subject: 'Добро пожаловать в Zoolbrus',
      text: `${req.body.name}! Поздравляем с регистрацией на Zoolbrus`
    };
    sgMail.send(msg);
  } else {
    const msg = {
      to: 'yashakuzmin@gmail.com',
      from: req.body.email,
      subject: 'Вопрос с zoolbrus',
      text: req.body.message
    };
    console.log(msg);
    sgMail.send(msg);
  }
};

module.exports = sendEmail;
