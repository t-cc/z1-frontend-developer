import exp from "constants";
import puppeteer from "puppeteer";

describe("App.tsx", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000", {
      waitUntil: "domcontentloaded",
    });
  });

  test("documment title", async () => {
    const body = await page.$("body");

    const title = await page.title();
    expect(title).toBe("ID document analyzer");
  });

  test("navigate to next window", async () => {
    const [button] = await page.$x("//button[contains(., 'TAKE PICTURE')]");
    await button.click();
    const [text] = await page.$x(
      "//div[contains(., 'Fit your ID card inside the frame. The picture will be taken automatically')]"
    );
    expect(text).toBeDefined();
  });

  test("click cancel button", async () => {
    const [button] = await page.$x("//button[contains(., 'CANCEL')]");
    await button.click();
    const [text] = await page.$x(
      "//div[contains(., 'Take a picture. It may take time to validate your personal information.')]"
    );
    expect(text).toBeDefined();
  });

  afterAll(() => browser.close());
});
