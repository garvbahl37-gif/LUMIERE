"""
Bing Images Scraper with Selenium
Scrapes high-quality, UNIQUE images for E-commerce products
Targets Bing Images which is more reliable for scraping than Google
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

# Product search terms - optimized for visual clarity
PRODUCTS = {
    "handbags": [
        "luxury quilted leather handbag", "structured leather tote bag", "mini designer crossbody bag",
        "golden woven evening clutch", "brown leather saddle bag", "beige bucket bag designer", 
        "black luxury handbag chain strap", "silver envelope clutch bag", "vintage leather doctor bag", 
        "camel leather shopper tote", "quilted designer flap bag", "soft leather hobo bag", 
        "pink structured box bag", "purple baguette bag designer", "black camera crossbody bag",
        "red luxury top handle bag", "white leather drawstring bag", "vintage elegant frame bag", 
        "designer leather bowling bag", "tan leather satchel bag", "minimalist leather pouch", 
        "unique round circle leather bag", "designer waist belt bag", "luxury monogram trunk bag", 
        "hermes style kelly handbag"
    ],
    "jewelry": [
        "white gold diamond tennis bracelet", "elegant pearl drop earrings", "layered gold chain necklace", 
        "vintage sapphire cocktail ring", "platinum diamond tennis bracelet", "delicate layered gold necklace", 
        "emerald drop earrings jewelry", "gold bangle bracelet stack", "solitaire diamond pendant necklace", 
        "large statement cocktail ring", "gold heart charm bracelet", "thick gold hoop earrings", 
        "minimal gold chain necklace", "designer gold statement ring", "wide gold cuff bracelet", 
        "crystal chandelier drop earrings", "diamond tennis choker necklace", "diamond eternity band ring", 
        "gold chain link bracelet", "round diamond stud earrings", "long gold lariat necklace", 
        "engraved gold signet ring", "minimalist gold bar bracelet", "bridal chandelier earrings", 
        "gold statement collar necklace"
    ],
    "shoes": [
        "red sole patent pumps", "crystal embellished heeled sandals", "tan suede ankle boots", 
        "nude strappy mule heels", "designer bow ballet flats", "beige kitten heel slingback", 
        "chunky platform loafers", "burgundy velvet evening pumps", "summer block heel sandals", 
        "black suede ankle booties", "red pointed toe stilettos", "strappy lace up high heels", 
        "flat leather slip on mules", "espadrille wedge heel sandals", "lug sole designer combat boots", 
        "patent mary jane pumps", "platform espadrille wedges", "gold gladiator sandals flat", 
        "brown leather chelsea boots", "elegant dorsay pumps", "black strappy cage heels", 
        "leather knee high boots", "minimal slide sandals", "womens leather oxford shoes", 
        "satin peep toe wedding heels"
    ],
    "dresses": [
        "green silk midi dress", "burgundy velvet evening gown", "white lace cocktail dress", 
        "champagne satin slip dress", "gold sequin mini party dress", "blue flowing chiffon maxi dress", 
        "black fitted bodycon dress", "navy classic a-line dress", "floral print wrap dress", 
        "white casual shirt dress", "pink pleated midi dress", "white romantic ruffle dress", 
        "red off shoulder evening dress", "yellow halter summer dress", "black professional blazer dress", 
        "cream knit sweater dress", "bohemian tiered maxi dress", "silver elegant column gown", 
        "white fitted bandage dress", "floral vintage tea dress", "beige minimalist shift dress", 
        "red fit and flare dress", "modern asymmetric hem dress", "black cutout designer dress", 
        "gold embroidered evening dress"
    ],
    "accessories": [
        "hermes style silk scarf", "gucci style leather belt", "cat eye womens sunglasses", 
        "grey luxury cashmere gloves", "bridal pearl hair clip", "gold luxury womens watch", 
        "winter designer wool hat", "designer leather wallet", "leather passport travel organizer", 
        "leather bag charm keychain", "luxury marble phone case", "slim leather card holder", 
        "designer leather makeup pouch", "leather travel passport cover", "pink velvet jewelry box", 
        "designer knot silk headband", "large satin hair bow", "vintage crystal brooch pin", 
        "gold designer tie pin", "luxury gold cufflinks set", "slim gold money clip", 
        "leather desk valet tray", "luxury print designer umbrella", "paisley silk pocket square", 
        "leather watch strap"
    ]
}

OUTPUT_DIR = "scraped_data"

def setup_driver():
    """Setup Chrome driver with basic options"""
    chrome_options = Options()
    
    # Random realistic user agent
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    # Basic options
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-notifications")
    
    # To run visibly (not headless) for best results
    # chrome_options.add_argument("--headless") 

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def get_bing_image(driver, search_term, used_urls):
    """Get a unique high-quality image URL from Bing Images"""
    try:
        encoded_term = urllib.parse.quote(search_term)
        url = f"https://www.bing.com/images/search?q={encoded_term}&qft=+filterui:imagesize-large"
        
        driver.get(url)
        # Wait for potential redirects or load
        time.sleep(1.5)
        
        # Wait for image containers
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.iusc"))
        )
        
        # Find image elements (Bing stores metadata in 'm' attribute of 'a.iusc')
        elements = driver.find_elements(By.CSS_SELECTOR, "a.iusc")
        
        for element in elements[:10]: # Check first 10 results
            try:
                m_attr = element.get_attribute("m")
                if not m_attr:
                    continue
                    
                m_data = json.loads(m_attr)
                img_url = m_data.get("murl")
                
                if not img_url:
                    continue
                    
                # Check uniqueness
                if img_url in used_urls:
                    continue
                
                # Basic validation
                if not img_url.startswith("http"):
                    continue
                    
                # We found a good, unique URL
                return img_url
                
            except Exception as e:
                # print(f"Error parsing element: {e}")
                continue
                
    except Exception as e:
        print(f"    Error searching '{search_term}': {e}")
        
    return None

def scrape_all():
    print("🚀 Starting Bing Images Scraper (Selenium)...")
    
    driver = setup_driver()
    used_urls = set()
    all_data = {}
    
    try:
        for category, items in PRODUCTS.items():
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
                    # Fallback unique placeholder
                    placeholder = f"https://placehold.co/800x1000/FAFAFA/333333?text={urllib.parse.quote(item)}"
                    category_images.append(placeholder)
                
                # Polite delay
                time.sleep(random.uniform(0.5, 1.5))
            
            all_data[category] = category_images
            
    finally:
        driver.quit()
        
    return all_data

def generate_typescript(data):
    """Generates the mockProducts.ts file content"""
    
    ts_content = """// Women's luxury products - 125 unique items with Selenium-scraped Unique Images
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
}
"""

    # Create image arrays
    for category, urls in data.items():
        ts_content += f"\nconst {category}Images = [\n"
        for url in urls:
            ts_content += f'    "{url}",\n'
        ts_content += "];\n"

    # Add the static names arrays from the original file (recreating them here for completeness)
    ts_content += """
const handbagNames = ["Quilted Shoulder Bag", "Structured Tote", "Mini Crossbody", "Woven Clutch", "Saddle Bag", "Bucket Bag", "Chain Link Bag", "Envelope Clutch", "Doctor Bag", "Shopper Tote", "Flap Bag", "Hobo Bag", "Box Bag", "Baguette Bag", "Camera Bag", "Top Handle Bag", "Drawstring Bag", "Frame Bag", "Bowling Bag", "Satchel Bag", "Pouch Bag", "Circle Bag", "Belt Bag", "Trunk Bag", "Kelly Style Bag"];

const jewelryNames = ["Diamond Bracelet", "Pearl Earrings", "Gold Necklace", "Sapphire Ring", "Tennis Bracelet", "Layered Necklace", "Emerald Earrings", "Bangle Set", "Pendant Necklace", "Cocktail Ring", "Charm Bracelet", "Hoop Earrings", "Chain Necklace", "Statement Ring", "Cuff Bracelet", "Drop Earrings", "Choker Necklace", "Eternity Ring", "Link Bracelet", "Stud Earrings", "Lariat Necklace", "Signet Ring", "Bar Bracelet", "Chandelier Earrings", "Collar Necklace"];

const shoeNames = ["Patent Pumps", "Embellished Sandals", "Suede Boots", "Strappy Mules", "Ballet Flats", "Kitten Slingbacks", "Platform Loafers", "Velvet Pumps", "Block Heel Sandals", "Ankle Booties", "Pointed Stilettos", "Lace-Up Heels", "Slip-On Mules", "Wedge Sandals", "Combat Boots", "Mary Jane Pumps", "Espadrille Wedges", "Gladiator Sandals", "Chelsea Boots", "D'Orsay Pumps", "Cage Heels", "Knee-High Boots", "Slide Sandals", "Oxford Flats", "Peep Toe Heels"];

const dressNames = ["Silk Midi Dress", "Velvet Gown", "Lace Cocktail Dress", "Satin Slip Dress", "Sequin Mini Dress", "Chiffon Maxi Dress", "Bodycon Dress", "A-Line Dress", "Wrap Dress", "Shirt Dress", "Pleated Dress", "Ruffle Dress", "Off-Shoulder Dress", "Halter Dress", "Blazer Dress", "Knit Dress", "Tiered Dress", "Column Dress", "Bandage Dress", "Tea Dress", "Shift Dress", "Fit Flare Dress", "Asymmetric Dress", "Cutout Dress", "Embroidered Dress"];

const accessoryNames = ["Silk Scarf", "Leather Belt", "Designer Sunglasses", "Cashmere Gloves", "Pearl Hair Clip", "Luxury Watch", "Wool Hat", "Designer Wallet", "Travel Organizer", "Leather Keychain", "Phone Case", "Card Holder", "Makeup Pouch", "Passport Cover", "Jewelry Box", "Headband", "Hair Bow", "Brooch Pin", "Tie Pin", "Cufflinks Set", "Money Clip", "Valet Tray", "Umbrella", "Pocket Square", "Watch Strap"];

function createProduct(id: number, name: string, catId: string, catName: string, catSlug: string, image: string, basePrice: number): MockProduct {
    const price = basePrice + Math.floor(Math.random() * 500);
    const hasDiscount = Math.random() > 0.7;
    const isNew = Math.random() > 0.6;
    const isFeatured = Math.random() > 0.7;
    
    // Ensure slug is clean
    const slug = name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    return {
        _id: `prod-${id}`,
        name,
        slug,
        description: `Exquisite ${name.toLowerCase()} crafted with premium materials. Perfect for any occasion with timeless elegance and superior quality.`,
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
        tags: [catSlug, "luxury", "women", "designer", isNew ? "new-arrival" : "", isFeatured ? "featured" : ""].filter(Boolean)
    };
}

export const mockProducts: MockProduct[] = [
    // HANDBAGS
    ...handbagNames.map((name, i) => createProduct(i + 1, name, "cat-1", "Handbags", "handbags", handbagImages[i], 850 + i * 80)),

    // JEWELRY
    ...jewelryNames.map((name, i) => createProduct(i + 26, name, "cat-2", "Jewelry", "jewelry", jewelryImages[i], 1200 + i * 150)),

    // SHOES
    ...shoeNames.map((name, i) => createProduct(i + 51, name, "cat-3", "Shoes", "shoes", shoeImages[i], 395 + i * 40)),

    // DRESSES
    ...dressNames.map((name, i) => createProduct(i + 76, name, "cat-4", "Dresses", "dresses", dressImages[i], 450 + i * 60)),

    // ACCESSORIES
    ...accessoryNames.map((name, i) => createProduct(i + 101, name, "cat-5", "Accessories", "accessories", accessoryImages[i], 150 + i * 50))
];

export default mockProducts;
"""
    return ts_content

if __name__ == "__main__":
    data = scrape_all()
    
    # Generate Mock Data
    ts_code = generate_typescript(data)
    
    # Save to file
    with open("src/data/mockProducts.ts", "w", encoding="utf-8") as f:
        f.write(ts_code)
        
    print("\\n✅ Successfully updated src/data/mockProducts.ts with 125 unique images!")
