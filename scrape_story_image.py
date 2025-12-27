
import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def setup_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

def download_image(url, save_path):
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(save_path, 'wb') as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            print(f"Downloaded: {save_path}")
            return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def scrape_story_image():
    driver = setup_driver()
    search_query = "luxury fashion atelier craftsmanship high resolution"
    url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}&tbm=isch&tbs=isz:l" # Large images only
    
    save_dir = os.path.join(os.getcwd(), "public", "assets", "story")
    os.makedirs(save_dir, exist_ok=True)
    
    try:
        driver.get(url)
        time.sleep(2)
        
        # Click the first relevant looking image (skipping potential ads/logos if possible, but first result usually okay for this query)
        images = driver.find_elements(By.CSS_SELECTOR, "div.bg0cfb") # Standard Google Image class, usually reliable or tries generic img
        if not images:
             images = driver.find_elements(By.TAG_NAME, "img")

        # Try to find a good candidate
        count = 0
        for img in images[:5]: 
            try:
                img.click()
                time.sleep(2)
                
                # Find the large image
                # Selector strategy for Google Images large preview
                large_imgs = driver.find_elements(By.CSS_SELECTOR, "img.sFlh5c")
                
                for large_img in large_imgs:
                    src = large_img.get_attribute("src")
                    if src and src.startswith("http") and not "encrypted" in src:
                        if download_image(src, os.path.join(save_dir, "atelier_story.jpg")):
                            print("Successfully downloaded image!")
                            return
            except:
                continue
                
    except Exception as e:
        print(f"Error scraping: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_story_image()
