jest.mock("nodemailer", () => ({
  createTransport: () => ({
    sendMail: jest.fn()
  })
}));

jest.mock("../services/email.service", () => ({
  sendEmail: jest.fn()
}));

jest.mock("../db/index", () => jest.fn());