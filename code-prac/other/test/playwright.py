from playwright import async_playwright
import asyncio

async def test_accessibility(page, url):
    await page.goto(url)
    accessibility_report = await page.accessbility.snapshot()
    return accessibility_report

async def login(page):
    await page.fill('input[name="user_name"]', 'your_username')
    await page.fill('input[name="user_name"]', 'your_password')
    await page.click('button[name="login]')
    await page.wait_for_for_selector('.logged-in')

async def main():
    urls = ['http://cosint.s-oceanmind.com:8007/industry/login']
    async with async_playwright() as playwright:
        for browser_type in [playwright.chromium, playwright.firefox, playwright.webkit]:
            browser = await browser_type.launch()
            context = await browser.new_context()
            page = await context.new_page()
            tasks = []
            for url in urls:
                tasks.append(test_accessibility(page, url))
            accessibility_reports = await asyncio.gather(*tasks)
            for url, report in zip(urls, accessibility_reports):
                print(f"Accessibility report for {url}: {report}")
            await browser.close()

asyncio.run(main())