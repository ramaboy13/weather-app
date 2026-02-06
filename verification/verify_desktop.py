from playwright.sync_api import sync_playwright
import time

def verify_desktop():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Set viewport to 1920x1080
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        print("Loading page...")
        for i in range(10):
            try:
                page.goto("http://localhost:3000")
                break
            except:
                time.sleep(2)

        try:
            page.wait_for_selector("text=Seattle", timeout=20000)
            print("Content loaded.")
        except:
            print("Timeout waiting for Seattle")

        time.sleep(2)

        page.screenshot(path="verification/desktop.png", full_page=True)
        print("Screenshot saved to verification/desktop.png")
        browser.close()

if __name__ == "__main__":
    verify_desktop()
