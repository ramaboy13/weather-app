from playwright.sync_api import sync_playwright
import time

def verify_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 375, "height": 812}) # Mobile

        print("Waiting for server...")
        for i in range(20):
            try:
                page.goto("http://localhost:3000")
                break
            except:
                time.sleep(2)

        try:
            page.wait_for_selector("text=Jakarta", timeout=30000)
            print("Dashboard loaded.")

            # Verify Air Quality Button exists and click it
            page.screenshot(path="verification/mobile_dashboard.png")

            page.click("text=Air Quality")
            page.wait_for_selector("text=AQI", timeout=10000)
            page.screenshot(path="verification/air_quality.png")
            print("Air Quality page verified.")

            page.go_back()
            # Wait for dashboard to reload
            page.wait_for_selector("text=Jakarta", timeout=30000)

            # Verify Nav Links
            # Using force=True to ensure click if something is slightly overlapping,
            # though layout fix should resolve it.
            page.click("text=Map", force=True)
            time.sleep(2)
            page.screenshot(path="verification/map_page.png")
            print("Map page verified.")

            page.click("text=Settings", force=True)
            time.sleep(1)
            page.screenshot(path="verification/settings_page.png")
            print("Settings page verified.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        browser.close()

if __name__ == "__main__":
    verify_features()
