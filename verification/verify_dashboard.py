from playwright.sync_api import sync_playwright
import time

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Waiting for server...")
        # Retry logic for server start
        for i in range(30):
            try:
                page.goto("http://localhost:3000")
                break
            except:
                time.sleep(2)

        print("Server responding. Waiting for content...")
        # Wait for content to load
        try:
            page.wait_for_selector("text=Seattle", timeout=20000)
            print("Found Seattle text.")
        except Exception as e:
            print(f"Timeout waiting for Seattle: {e}")

        time.sleep(5) # Wait for animations

        page.screenshot(path="verification/dashboard.png", full_page=True)
        print("Screenshot saved to verification/dashboard.png")
        browser.close()

if __name__ == "__main__":
    verify_dashboard()
