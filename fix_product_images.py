"""
Improved Product Image Scraper
Scrapes high-quality images that MATCH product descriptions
Uses Bing Images with optimized search queries

Features:
- Uses exact product names as search queries
- Validates image URLs before saving
- Supports both women's and men's products
- Generates TypeScript files directly
"""

import os
import time
import json
import random
import urllib.parse
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# ============================================
# WOMEN'S PRODUCT DEFINITIONS
# ============================================
# Each search term is crafted to match the exact product name
WOMENS_PRODUCTS = {
    "handbags": {
        "names": ["Quilted Shoulder Bag", "Structured Tote", "Mini Crossbody", "Woven Clutch", "Saddle Bag", 
                  "Bucket Bag", "Chain Link Bag", "Envelope Clutch", "Doctor Bag", "Shopper Tote", 
                  "Flap Bag", "Hobo Bag", "Box Bag", "Baguette Bag", "Camera Bag", 
                  "Top Handle Bag", "Drawstring Bag", "Frame Bag", "Bowling Bag", "Satchel Bag", 
                  "Pouch Bag", "Circle Bag", "Belt Bag", "Trunk Bag", "Kelly Style Bag"],
        "search_suffix": "luxury leather women",
        "cat_id": "cat-1",
        "cat_name": "Handbags",
        "cat_slug": "handbags",
        "base_price": 850
    },
    "jewelry": {
        "names": ["Diamond Bracelet", "Pearl Earrings", "Gold Necklace", "Sapphire Ring", "Tennis Bracelet", 
                  "Layered Necklace", "Emerald Earrings", "Bangle Set", "Pendant Necklace", "Cocktail Ring", 
                  "Charm Bracelet", "Hoop Earrings", "Chain Necklace", "Statement Ring", "Cuff Bracelet", 
                  "Drop Earrings", "Choker Necklace", "Eternity Ring", "Link Bracelet", "Stud Earrings", 
                  "Lariat Necklace", "Signet Ring", "Bar Bracelet", "Chandelier Earrings", "Collar Necklace"],
        "search_suffix": "luxury gold jewelry",
        "cat_id": "cat-2",
        "cat_name": "Jewelry",
        "cat_slug": "jewelry",
        "base_price": 1200
    },
    "shoes": {
        "names": ["Patent Pumps", "Embellished Sandals", "Suede Boots", "Strappy Mules", "Ballet Flats", 
                  "Kitten Slingbacks", "Platform Loafers", "Velvet Pumps", "Block Heel Sandals", "Ankle Booties", 
                  "Pointed Stilettos", "Lace-Up Heels", "Slip-On Mules", "Wedge Sandals", "Combat Boots", 
                  "Mary Jane Pumps", "Espadrille Wedges", "Gladiator Sandals", "Chelsea Boots", "D'Orsay Pumps", 
                  "Cage Heels", "Knee-High Boots", "Slide Sandals", "Oxford Flats", "Peep Toe Heels"],
        "search_suffix": "designer women shoes",
        "cat_id": "cat-3",
        "cat_name": "Shoes",
        "cat_slug": "shoes",
        "base_price": 395
    },
    "dresses": {
        "names": ["Silk Midi Dress", "Velvet Gown", "Lace Cocktail Dress", "Satin Slip Dress", "Sequin Mini Dress", 
                  "Chiffon Maxi Dress", "Bodycon Dress", "A-Line Dress", "Wrap Dress", "Shirt Dress", 
                  "Pleated Dress", "Ruffle Dress", "Off-Shoulder Dress", "Halter Dress", "Blazer Dress", 
                  "Knit Dress", "Tiered Dress", "Column Dress", "Bandage Dress", "Tea Dress", 
                  "Shift Dress", "Fit Flare Dress", "Asymmetric Dress", "Cutout Dress", "Embroidered Dress"],
        "search_suffix": "luxury fashion women",
        "cat_id": "cat-4",
        "cat_name": "Dresses",
        "cat_slug": "dresses",
        "base_price": 450
    },
    "accessories": {
        "names": ["Silk Scarf", "Leather Belt", "Designer Sunglasses", "Cashmere Gloves", "Pearl Hair Clip", 
                  "Luxury Watch", "Wool Hat", "Designer Wallet", "Travel Organizer", "Leather Keychain", 
                  "Phone Case", "Card Holder", "Makeup Pouch", "Passport Cover", "Jewelry Box", 
                  "Headband", "Hair Bow", "Brooch Pin", "Tie Pin", "Cufflinks Set", 
                  "Money Clip", "Valet Tray", "Umbrella", "Pocket Square", "Watch Strap"],
        "search_suffix": "luxury designer",
        "cat_id": "cat-5",
        "cat_name": "Accessories",
        "cat_slug": "accessories",
        "base_price": 150
    }
}

# ============================================
# MEN'S PRODUCT DEFINITIONS
# ============================================
MENS_PRODUCTS = {
    "mens-watches": {
        "names": ["Chronograph Elite", "Classic Automatic", "Diver's Professional", "Dress Watch", "Sport Chronometer", 
                  "Pilot Watch", "Skeleton Watch", "Moon Phase", "GMT Master", "Day-Date", 
                  "Perpetual Calendar", "Tourbillon", "Racing Chronograph", "Vintage Dress", "Military Field", 
                  "Nautical Timer", "Executive Gold", "Minimalist Steel", "Heritage Bronze", "Modern Ceramic"],
        "search_suffix": "luxury mens watch",
        "cat_id": "cat-6",
        "cat_name": "Men's Watches",
        "cat_slug": "mens-watches",
        "base_price": 2500
    },
    "mens-bags": {
        "names": ["Leather Briefcase", "Messenger Bag", "Laptop Portfolio", "Weekend Duffel", "Leather Backpack", 
                  "Document Case", "Travel Carry-On", "Crossbody Satchel", "Slim Folio", "Overnight Bag", 
                  "Executive Attache", "Convertible Tote", "Tech Backpack", "Garment Bag", "Duffle Weekender", 
                  "Shoulder Messenger", "Leather Holdall", "Business Bag", "Vintage Satchel", "Premium Carryall"],
        "search_suffix": "luxury mens leather",
        "cat_id": "cat-7",
        "cat_name": "Men's Bags",
        "cat_slug": "mens-bags",
        "base_price": 450
    },
    "mens-shoes": {
        "names": ["Oxford Dress Shoes", "Derby Brogues", "Leather Loafers", "Chelsea Boots", "Monk Strap", 
                  "Penny Loafers", "Wingtip Oxfords", "Suede Loafers", "Dress Boots", "Cap Toe Oxfords", 
                  "Tassel Loafers", "Chukka Boots", "Whole Cut", "Double Monk", "Venetian Loafers", 
                  "Jodhpur Boots", "Bit Loafers", "Longwing Brogues", "Side Zip Boots", "Opera Pumps"],
        "search_suffix": "luxury mens formal",
        "cat_id": "cat-8",
        "cat_name": "Men's Shoes",
        "cat_slug": "mens-shoes",
        "base_price": 350
    },
    "mens-suits": {
        "names": ["Classic Navy Suit", "Charcoal Pinstripe", "Slim Fit Black", "Italian Wool", "Double Breasted", 
                  "Peak Lapel", "Windowpane Check", "Herringbone Tweed", "Linen Summer", "Velvet Evening", 
                  "Tuxedo Set", "Three Piece", "Morning Coat", "Business Gray", "Midnight Blue", 
                  "Designer Blazer", "Cashmere Blend", "Sport Coat", "Dinner Jacket", "Modern Fit"],
        "search_suffix": "luxury mens tailored",
        "cat_id": "cat-9",
        "cat_name": "Men's Suits",
        "cat_slug": "mens-suits",
        "base_price": 1200
    },
    "mens-accessories": {
        "names": ["Silk Tie", "Leather Belt", "Cufflinks Set", "Pocket Square", "Leather Wallet", 
                  "Tie Bar", "Lapel Pin", "Sunglasses", "Money Clip", "Card Holder", 
                  "Collar Stays", "Bracelet", "Ring", "Handkerchief Set", "Suspenders", 
                  "Bow Tie", "Watch Band", "Passport Holder", "Key Holder", "Collar Pin"],
        "search_suffix": "designer mens luxury",
        "cat_id": "cat-10",
        "cat_name": "Men's Accessories",
        "cat_slug": "mens-accessories",
        "base_price": 95
    }
}


def setup_driver():
    """Setup Chrome driver with options to avoid detection"""
    chrome_options = Options()
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    # Run headless for faster execution
    # chrome_options.add_argument("--headless")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


def validate_image_url(url, timeout=5):
    """Check if an image URL is valid and accessible"""
    try:
        response = requests.head(url, timeout=timeout, allow_redirects=True)
        content_type = response.headers.get('content-type', '')
        return response.status_code == 200 and 'image' in content_type
    except:
        return False


def get_bing_image(driver, search_term, used_urls, validate=True):
    """Get a unique high-quality image URL from Bing Images"""
    try:
        encoded_term = urllib.parse.quote(search_term)
        url = f"https://www.bing.com/images/search?q={encoded_term}&qft=+filterui:imagesize-large+filterui:aspect-tall"
        
        driver.get(url)
        time.sleep(2)
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.iusc"))
        )
        
        elements = driver.find_elements(By.CSS_SELECTOR, "a.iusc")
        
        for element in elements[:20]:  # Check more results for better options
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
                
                # Skip certain problematic domains
                skip_domains = ['pinterest', 'facebook', 'instagram', 'tiktok']
                if any(domain in img_url.lower() for domain in skip_domains):
                    continue
                
                # Validate URL if requested
                if validate:
                    if not validate_image_url(img_url):
                        continue
                
                return img_url
                
            except Exception:
                continue
                
    except Exception as e:
        print(f"    Error searching '{search_term}': {e}")
        
    return None


def scrape_category(driver, category_data, used_urls, is_mens=False):
    """Scrape images for a single category"""
    images = []
    names = category_data["names"]
    suffix = category_data["search_suffix"]
    
    for i, name in enumerate(names):
        search_query = f"{name} {suffix}"
        print(f"  [{i+1}/{len(names)}] Searching: {search_query}")
        
        url = get_bing_image(driver, search_query, used_urls, validate=True)
        
        if url:
            print(f"    ✅ Found: {url[:60]}...")
            used_urls.add(url)
            images.append(url)
        else:
            # Fallback: try simpler search
            url = get_bing_image(driver, f"{name} luxury", used_urls, validate=False)
            if url:
                print(f"    ⚠️ Fallback found: {url[:60]}...")
                used_urls.add(url)
                images.append(url)
            else:
                print(f"    ❌ Using placeholder")
                placeholder = f"https://placehold.co/800x1000/1a1a1a/d4af37?text={urllib.parse.quote(name)}"
                images.append(placeholder)
        
        time.sleep(random.uniform(0.8, 1.5))
    
    return images


def scrape_all_products():
    """Scrape images for all products"""
    print("🚀 Starting Improved Product Image Scraper...")
    
    driver = setup_driver()
    used_urls = set()
    womens_data = {}
    mens_data = {}
    
    try:
        # Scrape Women's Products
        print("\n" + "="*50)
        print("👗 WOMEN'S PRODUCTS")
        print("="*50)
        
        for category, data in WOMENS_PRODUCTS.items():
            print(f"\n📂 Category: {data['cat_name'].upper()}")
            images = scrape_category(driver, data, used_urls)
            womens_data[category] = {**data, "images": images}
        
        # Scrape Men's Products
        print("\n" + "="*50)
        print("👔 MEN'S PRODUCTS")
        print("="*50)
        
        for category, data in MENS_PRODUCTS.items():
            print(f"\n📂 Category: {data['cat_name'].upper()}")
            images = scrape_category(driver, data, used_urls, is_mens=True)
            mens_data[category] = {**data, "images": images}
            
    finally:
        driver.quit()
        
    return womens_data, mens_data


def generate_womens_typescript(data):
    """Generate mockProducts.ts content"""
    ts = '''// Women's luxury products - 125 unique items with Selenium-scraped Unique Images
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

'''
    
    # Image arrays
    var_map = {
        "handbags": "handbagsImages",
        "jewelry": "jewelryImages", 
        "shoes": "shoesImages",
        "dresses": "dressesImages",
        "accessories": "accessoriesImages"
    }
    
    for cat, cat_data in data.items():
        var_name = var_map.get(cat, cat + "Images")
        ts += f"const {var_name} = [\n"
        for url in cat_data["images"]:
            ts += f'    "{url}",\n'
        ts += "];\n\n"
    
    # Name arrays and create function
    ts += '''const handbagNames = ["Quilted Shoulder Bag", "Structured Tote", "Mini Crossbody", "Woven Clutch", "Saddle Bag", "Bucket Bag", "Chain Link Bag", "Envelope Clutch", "Doctor Bag", "Shopper Tote", "Flap Bag", "Hobo Bag", "Box Bag", "Baguette Bag", "Camera Bag", "Top Handle Bag", "Drawstring Bag", "Frame Bag", "Bowling Bag", "Satchel Bag", "Pouch Bag", "Circle Bag", "Belt Bag", "Trunk Bag", "Kelly Style Bag"];

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

// Import men's products
import { mockMensProducts } from './mockMensProducts';

// Women's products
const womensProducts: MockProduct[] = [
    // HANDBAGS
    ...handbagNames.map((name, i) => createProduct(i + 1, name, "cat-1", "Handbags", "handbags", handbagsImages[i], 850 + i * 80)),

    // JEWELRY
    ...jewelryNames.map((name, i) => createProduct(i + 26, name, "cat-2", "Jewelry", "jewelry", jewelryImages[i], 1200 + i * 150)),

    // SHOES
    ...shoeNames.map((name, i) => createProduct(i + 51, name, "cat-3", "Shoes", "shoes", shoesImages[i], 395 + i * 40)),

    // DRESSES
    ...dressNames.map((name, i) => createProduct(i + 76, name, "cat-4", "Dresses", "dresses", dressesImages[i], 450 + i * 60)),

    // ACCESSORIES
    ...accessoryNames.map((name, i) => createProduct(i + 101, name, "cat-5", "Accessories", "accessories", accessoriesImages[i], 150 + i * 50))
];

// Combined products (Women's + Men's)
export const mockProducts: MockProduct[] = [
    ...womensProducts,
    ...mockMensProducts as unknown as MockProduct[]
];

export default mockProducts;
'''
    return ts


def generate_mens_typescript(data):
    """Generate mockMensProducts.ts content"""
    ts = '''// Men's luxury products - 100 unique items with high-quality images
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

'''
    
    var_map = {
        "mens-watches": "watchesImages",
        "mens-bags": "mensBagsImages",
        "mens-shoes": "mensShoesImages",
        "mens-suits": "suitImages",
        "mens-accessories": "mensAccessoriesImages"
    }
    
    for cat, cat_data in data.items():
        var_name = var_map.get(cat, cat.replace("-", "_") + "Images")
        ts += f"// {cat_data['cat_name']} Images\n"
        ts += f"const {var_name} = [\n"
        for url in cat_data["images"]:
            ts += f'    "{url}",\n'
        ts += "];\n\n"
    
    ts += '''// Product Names
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
'''
    return ts


if __name__ == "__main__":
    print("="*60)
    print("  IMPROVED PRODUCT IMAGE SCRAPER")
    print("  Fetches images matching exact product descriptions")
    print("="*60)
    
    womens_data, mens_data = scrape_all_products()
    
    # Generate TypeScript files
    print("\n📝 Generating TypeScript files...")
    
    womens_ts = generate_womens_typescript(womens_data)
    with open("src/data/mockProducts.ts", "w", encoding="utf-8") as f:
        f.write(womens_ts)
    print("  ✅ Updated src/data/mockProducts.ts")
    
    mens_ts = generate_mens_typescript(mens_data)
    with open("src/data/mockMensProducts.ts", "w", encoding="utf-8") as f:
        f.write(mens_ts)
    print("  ✅ Updated src/data/mockMensProducts.ts")
    
    print("\n" + "="*60)
    print("  🎉 COMPLETE!")
    print("  Both women's and men's product images have been updated.")
    print("  Run 'npm run dev' to see the changes.")
    print("="*60)
