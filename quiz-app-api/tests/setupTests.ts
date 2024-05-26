jest.mock("nodemailer", () => ({
  createTransport: () => ({
    sendMail: jest.fn()
  })
}));

jest.mock("../services/email.service", () => ({
  sendEmail: jest.fn()
}));