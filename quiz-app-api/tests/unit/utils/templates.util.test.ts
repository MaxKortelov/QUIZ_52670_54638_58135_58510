import {resetPasswordTemplateHTML, verifyEmailTemplateHTML} from "../../../utils/templates.util";

describe("Test template utils", () => {
  test("It should return generated html template string with url in it - resetPasswordTemplateHTML", () => {
    const url = "https://testUrl.com"
    expect(resetPasswordTemplateHTML(url)).toContain(url);
    expect(resetPasswordTemplateHTML(url)).toContain("Quiz Password Reset");
  });

  test("It should return generated html template string with url in it - verifyEmailTemplateHTML", () => {
    const url = "https://testUrl.com"
    expect(verifyEmailTemplateHTML(url)).toContain(url);
    expect(verifyEmailTemplateHTML(url)).toContain("Quiz Verify Account");
  });
});