"""
Bing Images Scraper with Selenium - Men's Products
Scrapes high-quality, UNIQUE images for Men's luxury products
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

# Men's product search terms
MENS_PRODUCTS = {
    "mens-watches": [
        "luxury chronograph watch mens", "automatic dress watch men", "professional diver watch",
        "mens dress watch gold", "sport chronometer watch", "pilot aviation watch mens",
        "skeleton automatic watch", "moon phase luxury watch", "gmt master watch mens",
        "day date gold watch", "perpetual calendar watch", "tourbillon luxury watch",
        "racing chronograph mens", "vintage dress watch", "military field watch",
        "nautical timer watch", "executive gold watch", "minimalist steel watch",
        "heritage bronze watch", "modern ceramic watch mens"
    ],
    "mens-bags": [
        "luxury leather briefcase mens", "designer messenger bag leather", "laptop portfolio bag mens",
        "weekend leather duffel bag", "premium leather backpack men", "leather document case",
        "travel carry-on leather", "crossbody satchel mens", "slim leather folio bag",
        "overnight leather bag", "executive leather attache", "convertible tote bag mens",
        "tech leather backpack", "designer garment bag", "luxury duffle weekender",
        "shoulder messenger leather", "leather holdall bag", "business bag mens leather",
        "vintage leather satchel", "premium carryall bag"
    ],
    "mens-shoes": [
        "oxford dress shoes mens", "derby brogue shoes leather", "leather loafers designer",
        "chelsea boots mens leather", "monk strap dress shoes", "penny loafers luxury",
        "wingtip oxford shoes", "suede loafers mens", "dress boots leather mens",
        "cap toe oxford shoes", "tassel loafers mens", "chukka boots leather",
        "whole cut dress shoes", "double monk strap shoes", "venetian loafers luxury",
        "jodhpur boots mens", "bit loafers designer", "longwing brogue shoes",
        "side zip boots mens", "opera pumps formal"
    ],
    "mens-suits": [
        "classic navy suit mens", "charcoal pinstripe suit", "slim fit black suit designer",
        "italian wool suit mens", "double breasted suit", "peak lapel suit luxury",
        "windowpane check suit", "herringbone tweed blazer", "linen summer suit mens",
        "velvet evening jacket", "tuxedo set mens formal", "three piece suit designer",
        "morning coat mens", "business gray suit", "midnight blue suit luxury",
        "designer blazer mens", "cashmere blend suit", "sport coat mens",
        "dinner jacket black tie", "modern fit suit mens"
    ],
    "mens-accessories": [
        "silk tie designer mens", "leather belt luxury", "gold cufflinks set mens",
        "silk pocket square", "leather wallet mens luxury", "gold tie bar clip",
        "lapel pin mens formal", "designer sunglasses mens", "gold money clip",
        "leather card holder", "gold collar stays", "mens bracelet luxury",
        "signet ring mens gold", "silk handkerchief set", "leather suspenders mens",
        "silk bow tie formal", "leather watch band", "leather passport holder",
        "leather key holder", "gold collar pin mens"
    ]
}

def setup_driver():
    """Setup Chrome driver with basic options"""
    chrome_options = Options()
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-notifications")
    # chrome_options.add_argument("--headless")  # Uncomment for headless mode

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def get_bing_image(driver, search_term, used_urls):
    """Get a unique high-quality image URL from Bing Images"""
    try:
        encoded_term = urllib.parse.quote(search_term)
        url = f"https://www.bing.com/images/search?q={encoded_term}&qft=+filterui:imagesize-large"
        
        driver.get(url)
        time.sleep(1.5)
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.iusc"))
        )
        
        elements = driver.find_elements(By.CSS_SELECTOR, "a.iusc")
        
        for element in elements[:15]:
            try:
                m_attr = element.get_attribute("m")
                if not m_attr:
                    continue
                    
                m_data = json.loads(m_attr)
                img_url = m_data.get("murl")
                
                if not img_url:
                    continue
                    
                if img_url in used_urls:
                    continue
                
                if not img_url.startswith("http"):
                    continue
                    
                return img_url
                
            except Exception as e:
                continue
                
    except Exception as e:
        print(f"    Error searching '{search_term}': {e}")
        
    return None

def scrape_mens_images():
    print("🚀 Starting Men's Products Image Scraper (Selenium)...")
    
    driver = setup_driver()
    used_urls = set()
    all_data = {}
    
    try:
        for category, items in MENS_PRODUCTS.items():
            print(f"\n📂 Processing Category: {category.upper()}")
            category_images = []
            
            for i, item in enumerate(items):
                print(f"  [{i+1}/{len(items)}] Searching: {item}")
                
                url = get_bing_image(driver, item, used_urls)
                
                if url:
                    print(f"    ✅ Found: {url[:60]}...")
                    used_urls.add(url)
                    category_images.append(url)
                else:
                    print(f"    ⚠️ No unique image found (using placeholder)")
                    placeholder = f"https://placehold.co/800x1000/2C2C2C/D4AF37?text={urllib.parse.quote(item)}"
                    category_images.append(placeholder)
                
                time.sleep(random.uniform(0.5, 1.5))
            
            all_data[category] = category_images
            
    finally:
        driver.quit()
        
    return all_data

def generate_typescript(data):
    """Generates updated mockMensProducts.ts content"""
    
    ts_content = """// Men's luxury products - 100 unique items with Selenium-scraped images
export interface MockProduct {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: { _id: string; name: string; slug: string; };
    categoryName: string;
    image: string;
    images: string[];
    stock: number;
    isNew: boolean;
    isFeatured: boolean;
    isActive: boolean;
    rating: number;
    numReviews: number;
    tags: string[];
    gender: 'men';
}
"""

    # Category mappings
    cat_var_names = {
        "mens-watches": "watchesImages",
        "mens-bags": "mensBagsImages",
        "mens-shoes": "mensShoesImages",
        "mens-suits": "suitImages",
        "mens-accessories": "mensAccessoriesImages"
    }

    # Create image arrays
    for category, urls in data.items():
        var_name = cat_var_names.get(category, category.replace("-", "_") + "Images")
        ts_content += f"\nconst {var_name} = [\n"
        for url in urls:
            ts_content += f'    "{url}",\n'
        ts_content += "];\n"

    # Add product names and create function (same as original)
    ts_content += """
const watchNames = ["Chronograph Elite", "Classic Automatic", "Diver's Professional", "Dress Watch", "Sport Chronometer", "Pilot Watch", "Skeleton Watch", "Moon Phase", "GMT Master", "Day-Date", "Perpetual Calendar", "Tourbillon", "Racing Chronograph", "Vintage Dress", "Military Field", "Nautical Timer", "Executive Gold", "Minimalist Steel", "Heritage Bronze", "Modern Ceramic"];

const mensBagNames = ["Leather Briefcase", "Messenger Bag", "Laptop Portfolio", "Weekend Duffel", "Leather Backpack", "Document Case", "Travel Carry-On", "Crossbody Satchel", "Slim Folio", "Overnight Bag", "Executive Attache", "Convertible Tote", "Tech Backpack", "Garment Bag", "Duffle Weekender", "Shoulder Messenger", "Leather Holdall", "Business Bag", "Vintage Satchel", "Premium Carryall"];

const mensShoeNames = ["Oxford Dress Shoes", "Derby Brogues", "Leather Loafers", "Chelsea Boots", "Monk Strap", "Penny Loafers", "Wingtip Oxfords", "Suede Loafers", "Dress Boots", "Cap Toe Oxfords", "Tassel Loafers", "Chukka Boots", "Whole Cut", "Double Monk", "Venetian Loafers", "Jodhpur Boots", "Bit Loafers", "Longwing Brogues", "Side Zip Boots", "Opera Pumps"];

const suitNames = ["Classic Navy Suit", "Charcoal Pinstripe", "Slim Fit Black", "Italian Wool", "Double Breasted", "Peak Lapel", "Windowpane Check", "Herringbone Tweed", "Linen Summer", "Velvet Evening", "Tuxedo Set", "Three Piece", "Morning Coat", "Business Gray", "Midnight Blue", "Designer Blazer", "Cashmere Blend", "Sport Coat", "Dinner Jacket", "Modern Fit"];

const mensAccessoryNames = ["Silk Tie", "Leather Belt", "Cufflinks Set", "Pocket Square", "Leather Wallet", "Tie Bar", "Lapel Pin", "Sunglasses", "Money Clip", "Card Holder", "Collar Stays", "Bracelet", "Ring", "Handkerchief Set", "Suspenders", "Bow Tie", "Watch Band", "Passport Holder", "Key Holder", "Collar Pin"];

function createMensProduct(id: number, name: string, catId: string, catName: string, catSlug: string, image: string, basePrice: number): MockProduct {
    const price = basePrice + Math.floor(Math.random() * 500);
    const hasDiscount = Math.random() > 0.7;
    const isNew = Math.random() > 0.6;
    const isFeatured = Math.random() > 0.7;

    const slug = name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    return {
        _id: `mens-prod-${id}`,
        name,
        slug,
        description: `Premium ${name.toLowerCase()} crafted with the finest materials. Perfect for the distinguished gentleman who appreciates quality and timeless elegance.`,
        price,
        compareAtPrice: hasDiscount ? price + Math.floor(Math.random() * 300) + 100 : undefined,
        category: { _id: catId, name: catName, slug: catSlug },
        categoryName: catName,
        image,
        images: [image],
        stock: Math.floor(Math.random() * 30) + 5,
        isNew,
        isFeatured,
        isActive: true,
        rating: 4 + Math.random(),
        numReviews: Math.floor(Math.random() * 150) + 10,
        tags: [catSlug, "luxury", "men", "designer", isNew ? "new-arrival" : "", isFeatured ? "featured" : ""].filter(Boolean),
        gender: 'men'
    };
}

export const mockMensProducts: MockProduct[] = [
    // WATCHES
    ...watchNames.map((name, i) => createMensProduct(i + 1, name, "cat-6", "Men's Watches", "mens-watches", watchesImages[i], 2500 + i * 200)),

    // BAGS
    ...mensBagNames.map((name, i) => createMensProduct(i + 21, name, "cat-7", "Men's Bags", "mens-bags", mensBagsImages[i], 450 + i * 80)),

    // SHOES
    ...mensShoeNames.map((name, i) => createMensProduct(i + 41, name, "cat-8", "Men's Shoes", "mens-shoes", mensShoesImages[i], 350 + i * 50)),

    // SUITS
    ...suitNames.map((name, i) => createMensProduct(i + 61, name, "cat-9", "Men's Suits", "mens-suits", suitImages[i], 1200 + i * 150)),

    // ACCESSORIES
    ...mensAccessoryNames.map((name, i) => createMensProduct(i + 81, name, "cat-10", "Men's Accessories", "mens-accessories", mensAccessoriesImages[i], 95 + i * 40))
];

export default mockMensProducts;
"""
    return ts_content

if __name__ == "__main__":
    data = scrape_mens_images()
    
    # Generate TypeScript
    ts_code = generate_typescript(data)
    
    # Save to file
    with open("src/data/mockMensProducts.ts", "w", encoding="utf-8") as f:
        f.write(ts_code)
        
    print("\n✅ Successfully updated src/data/mockMensProducts.ts with 100 unique men's product images!")
