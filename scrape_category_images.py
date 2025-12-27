"""
Bing Category Images Scraper (Selenium)
Scrapes specific 4K Editorial Images for Categories
- Vertical (Portrait) for Category Cards
- Horizontal (Landscape) for Shop Hero Banners
"""

import os
import time
import json
import random
import urllib.parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Category Search Terms
# [Vertical Query, Horizontal Query]
CATEGORIES = {
    "handbags": [
        "luxury handbag editorial fashion photography portrait 4k",
        "luxury leather handbag fashion banner wide 4k website header"
    ],
    "jewelry": [
        "luxury diamond jewelry editorial model portrait 4k",
        "luxury jewelry diamond necklace banner wide 4k"
    ],
    "shoes": [
        "luxury high heels fashion editorial portrait 4k",
        "designer shoes heels collection banner wide 4k"
    ],
    "dresses": [
        "luxury fashion dress editorial model photoshoot portrait 4k",
        "luxury fashion runway dresses wide banner 4k"
    ],
    "accessories": [
        "luxury fashion accessories scarf sunglasses editorial portrait",
        "luxury fashion accessories flatlay banner wide 4k"
    ]
}

def setup_driver():
    """Setup Chrome driver"""
    chrome_options = Options()
    # Masking
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--start-maximized")
    
    # Run visibly to ensure loading
    # chrome_options.add_argument("--headless") 

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def get_bing_image(driver, search_term, aspect_filter):
    """
    Get a high-quality image URL from Bing Images
    aspect_filter: 'aspect-tall' (Vertical) or 'aspect-wide' (Horizontal)
    """
    try:
        encoded_term = urllib.parse.quote(search_term)
        # qft filters: 
        # filterui:imagesize-wallpaper (High Res)
        # filterui:aspect-tall or aspect-wide
        url = f"https://www.bing.com/images/search?q={encoded_term}&qft=+filterui:imagesize-wallpaper+filterui:{aspect_filter}"
        
        print(f"    Searching: {search_term} ({aspect_filter})")
        driver.get(url)
        time.sleep(2)
        
        # Wait for images
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.iusc"))
        )
        
        elements = driver.find_elements(By.CSS_SELECTOR, "a.iusc")
        
        for element in elements[:15]: # Check first 15
            try:
                m_attr = element.get_attribute("m")
                if not m_attr: continue
                
                m_data = json.loads(m_attr)
                img_url = m_data.get("murl")
                
                if not img_url or not img_url.startswith("http"): continue
                
                # Simple check to avoid very long data URLs or tracked URLs if possible, 
                # but Bing direct URLs are usually fine.
                
                return img_url
                
            except:
                continue
                
    except Exception as e:
        print(f"    Error: {e}")
        
    return None

def scrape_categories():
    print("🚀 Starting Bing Category Image Scraper...")
    driver = setup_driver()
    results = {}
    
    try:
        for cat, queries in CATEGORIES.items():
            print(f"\n📂 Processing: {cat.upper()}")
            
            # Scrape Vertical (Card)
            vertical_url = get_bing_image(driver, queries[0], "aspect-tall")
            if vertical_url:
                print(f"    ✅ Vertical: {vertical_url[:50]}...")
            else:
                vertical_url = f"https://placehold.co/600x800/f8f4f0/333?text={cat}+Vertical"
                print("    ⚠️ No vertical found")
                
            time.sleep(1)
            
            # Scrape Horizontal (Hero)
            horizontal_url = get_bing_image(driver, queries[1], "aspect-wide")
            if horizontal_url:
                print(f"    ✅ Horizontal: {horizontal_url[:50]}...")
            else:
                horizontal_url = f"https://placehold.co/1920x600/f8f4f0/333?text={cat}+Hero"
                print("    ⚠️ No horizontal found")

            results[cat] = {
                "image": vertical_url,
                "heroImage": horizontal_url
            }
            
            time.sleep(random.uniform(1, 2))
            
    finally:
        driver.quit()
        
    return results

def update_mock_categories(data):
    """Generate the updated mockCategories.ts file"""
    
    content = """// Women's luxury product categories with unique hero images and 4K scraped content
export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    heroImage: string;
    productCount?: number;
}

export const mockCategories: Category[] = [
"""
    
    # Map slug to ID and static data
    cat_meta = {
        "handbags": {"id": "cat-1", "name": "Handbags", "desc": "Elegant designer handbags for the modern woman"},
        "jewelry": {"id": "cat-2", "name": "Jewelry", "desc": "Exquisite fine jewelry and accessories"},
        "shoes": {"id": "cat-3", "name": "Shoes", "desc": "Luxury footwear for every occasion"},
        "dresses": {"id": "cat-4", "name": "Dresses", "desc": "Stunning designer dresses for all occasions"},
        "accessories": {"id": "cat-5", "name": "Accessories", "desc": "Premium accessories to complete your look"}
    }
    
    order = ["handbags", "jewelry", "shoes", "dresses", "accessories"]
    
    for slug in order:
        meta = cat_meta[slug]
        img_data = data.get(slug, {"image": "", "heroImage": ""})
        
        content += f"""    {{
        _id: "{meta['id']}",
        name: "{meta['name']}",
        slug: "{slug}",
        description: "{meta['desc']}",
        image: "{img_data['image']}",
        heroImage: "{img_data['heroImage']}"
    }},
"""

    content += """];

export default mockCategories;
"""
    
    return content

if __name__ == "__main__":
    data = scrape_categories()
    
    ts_content = update_mock_categories(data)
    
    with open("src/data/mockCategories.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print("\n✅ Successfully updated src/data/mockCategories.ts with 4K images!")
