// Women's luxury products - 125 unique items with Selenium-scraped Unique Images
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

const handbagsImages = [
    "https://i.pinimg.com/originals/12/82/d4/1282d4a666200ed84175c475f2467aca.jpg",
    "https://urbanarticle.com/cdn/shop/products/A7FA186D-B87C-43DB-865F-90BAFD6E9530.jpg?v=1628187950&width=823",
    "https://i.etsystatic.com/38156933/r/il/c80c49/6006087927/il_1080xN.6006087927_93iy.jpg",
    "https://m.media-amazon.com/images/I/714HTHemYZL._AC_UL1500_.jpg",
    "https://i.etsystatic.com/28420428/r/il/549713/3934249829/il_1080xN.3934249829_1vgd.jpg",
    "https://cdnc.lystit.com/photos/466c-2015/08/12/anya-hindmarch-flame-red-vaughan-leather-bucket-bag-red-product-2-363413322-normal.jpeg",
    "https://product-images.therealreal.com/BOT315691_2_enlarged.jpg",
    "https://i.etsystatic.com/14236499/r/il/3648b2/2218098125/il_1080xN.2218098125_4h22.jpg",
    "https://ileatherhandbag.com/cdn/shop/files/05_1d7a1c6b-8234-4e9c-9498-d907d84e9baf_1024x1024.jpg?v=1703570646",
    "https://i.pinimg.com/736x/22/66/02/226602ffdb1d8988fe3ed4dd6e243548.jpg",
    "https://www.alexanderwang.com/on/demandware.static/-/Sites-master/default/dwd1497f64/hi-res/20425K55L001K.jpg",
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1691429393-84334317_030_b.jpg?crop=1xw:1xh;center,top&resize=980:*",
    "https://cdn.ferragamo.com/wcsstore/FerragamoCatalogAssetStore/images/products/757942/757942_05_r20.jpg",
    "https://i.etsystatic.com/18379019/r/il/e71c2b/6536210238/il_1080xN.6536210238_r69a.jpg",
    "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_4668291_100297_c",
    "https://product-images.therealreal.com/TOD164125_2_enlarged.jpg",
    "https://product-images.therealreal.com/WHM21153_3_enlarged.jpg",
    "https://product-images.therealreal.com/PRA154331_3_enlarged.jpg",
    "https://product-images.therealreal.com/PRA114304_3_enlarged.jpg",
    "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_4466716_100106_m",
    "https://cdnd.lystit.com/photos/2012/11/08/topshop-tan-leather-pouch-crossbody-bag-product-1-5177063-046317118.jpeg",
    "https://i.pinimg.com/originals/cd/f0/22/cdf022bc8bb832a775668c5079ecfc66.jpg",
    "https://i.pinimg.com/originals/11/d4/ea/11d4ea47fa19a93d59483b1c467a686c.png",
    "https://i.pinimg.com/736x/64/de/61/64de61fe0dd281196aaf7b1033bdaa3a.jpg",
    "https://i.pinimg.com/originals/4a/a4/4f/4aa44f9f644956d9bb5265d73bb6b7e8.jpg",
];

const jewelryImages = [
    "https://a.1stdibscdn.com/870-carats-diamonds-18k-gold-modern-bracelet-for-sale/j_26992/j_227829721715244684727/IMG_6649_org.jpeg?disable=upscale&auto=webp&quality=60&width=1400",
    "https://i.etsystatic.com/6512327/r/il/a665df/2962210646/il_fullxfull.2962210646_4377.jpg",
    "https://i.pinimg.com/736x/ff/90/4b/ff904bf09d7375de0e9f493ff0eef8ec.jpg",
    "https://i.pinimg.com/736x/f6/82/27/f68227f59bfabea0a3a219fbf3461a68--sapphire-engagement-ring-jewelry-sets.jpg",
    "https://i.etsystatic.com/6886004/r/il/9875f8/4177960304/il_1080xN.4177960304_q36s.jpg",
    "https://i.etsystatic.com/16794142/r/il/9963f3/1578050123/il_1080xN.1578050123_2j2m.jpg",
    "https://i.etsystatic.com/6374506/r/il/d3a590/819776218/il_1588xN.819776218_rklj.jpg",
    "https://i.pinimg.com/originals/93/5d/99/935d996195b1de176c7aac1a40bfaa39.jpg",
    "https://cdn.shopify.com/s/files/1/2579/7674/products/1Ana-Luisa-Jewelry-Necklaces-Pendants-Gold-Pendant-Necklace-Pebble-Gold.jpg?v=1678973216",
    "https://i.pinimg.com/originals/85/38/2c/85382c8236b4581d7b8e7db0d02b776a.jpg",
    "https://i.pinimg.com/originals/89/35/9c/89359c3b2daa0fa5e675671e4265c790.jpg",
    "https://i.pinimg.com/originals/03/26/f7/0326f7ecaf6eabb43c52bfe2247b19ea.jpg",
    "https://assets.vogue.com/photos/649448aa321e5a10a0c8bc89/master/w_2560%2Cc_limit/w2000_q60%2520(1).jpeg",
    "https://i.etsystatic.com/25184901/r/il/199b60/5805033425/il_1080xN.5805033425_id72.jpg",
    "https://m.media-amazon.com/images/I/61JkwRCwGxL._AC_SL1500_.jpg",
    "https://i.pinimg.com/originals/79/4f/81/794f81016eb60fdd6e59c392b53d43d9.jpg",
    "https://i.etsystatic.com/22223184/r/il/007a46/3172346451/il_fullxfull.3172346451_axul.jpg",
    "https://i.etsystatic.com/9792770/r/il/2f1af3/3893289742/il_794xN.3893289742_q3wf.jpg",
    "https://i.etsystatic.com/48714312/r/il/29fdf4/5678881323/il_1140xN.5678881323_ofq6.jpg",
    "https://obyjewelry.com/cdn/shop/files/HammerTextureStudEarrings_1_063dc7d4-5977-44fa-9747-503229edd44f.webp?v=1714030287",
    "https://cdn.shopify.com/s/files/1/0591/5689/products/N2076.G_6e5c898d-3e82-4f98-88fb-bc1bf86d56a3_2000x2000.jpg?v=1613016209",
    "https://i.etsystatic.com/50555161/r/il/d06110/6275367724/il_1080xN.6275367724_l1f4.jpg",
    "https://hellosupply.com/wp-content/uploads/2015/12/Gold-Bar-Pave-Bracelet-.jpg",
    "https://i.pinimg.com/originals/35/88/74/358874595ace66e9f8851a7d679e9f5e.jpg",
    "https://product-images.therealreal.com/NECKL261693_1_enlarged.jpg",
];

const shoesImages = [
    "https://product-images.therealreal.com/VAL77077_2_enlarged.jpg",
    "https://i.pinimg.com/736x/8d/17/70/8d1770f3b8288e01a5d115c26b5a35c4.jpg",
    "https://cdn.cliqueinc.com/posts/294856/best-suede-boots-294856-1629524668319-main.900x0c.jpg?interlace=true&quality=70",
    "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_SHOES_STUNNER_BLACK-PATENT_02.jpg?v=1693500785",
    "https://product-images.therealreal.com/CHT66155_3_enlarged.jpg",
    "https://n.nordstrommedia.com/it/0afd07d1-32e1-4914-ba7f-eaf7c98c586a.jpeg?h=368&w=240&dpr=2",
    "https://n.nordstrommedia.com/it/ad120290-9fd5-4d19-8304-6634845fa73b.jpeg?h=368&w=240&dpr=2",
    "https://i.pinimg.com/originals/e0/aa/46/e0aa466442038d6eed98c04d16bffbd9.jpg",
    "https://img.ltwebstatic.com/images3_pi/2025/02/07/1f/1738892850628665f67782115baf8f7bd752999db9_thumbnail_900x.jpg",
    "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_4844599_100106_c",
    "https://img.ltwebstatic.com/images3_pi/2025/02/12/d6/17393396605f844b7fdf12acd1ff28002b08cb15ed_thumbnail_900x.jpg",
    "https://cdn-img.prettylittlething.com/8/f/a/0/8fa01f9cc9ece7348898993dc995bd81a9c41424_cmh5209_1.jpg",
    "https://i.pinimg.com/originals/40/d1/42/40d1427968cf874cf373f2c438c831fc.jpg",
    "https://is4.fwrdassets.com/images/p/fw/z/SLAU-WZ707_V2.jpg",
    "https://editorialist.com/web/2022/12/023/031/805/23031805~black_0.jpg",
    "https://cdna.lystit.com/520/650/n/photos/mytheresa/bad17eb8/gianvito-rossi-black-Nuit-Leather-Mary-Jane-Pumps.jpeg",
    "https://media.bergdorfgoodman.com/images/f_auto,q_auto:low,ar_5:7,c_fill,dpr_2.0,w_720/01/2773430_a/castaner-80mm-wedge-espadrille-with-a",
    "https://media1.popsugar-assets.com/files/thumbor/Gsik7ZQ1xh1hGqTWILEA_NpWZWU=/fit-in/792x1188/filters:format_auto():upscale()/2015/05/06/691/n/1922564/491b0515_35042720_013_b.jpg",
    "https://media1.popsugar-assets.com/files/thumbor/Vv20lflw7ppLXWzzqnqTAZSmgVY=/fit-in/792x1404/filters:format_auto():upscale()/2021/09/15/724/n/1922564/07522b41104dafde_netimgPzRaFI.jpg",
    "https://n.nordstrommedia.com/it/1e0e2b04-0c7c-4748-b872-a902412288f8.jpeg?h=368&w=240&dpr=2",
    "http://cdnd.lystit.com/photos/2013/11/25/michael-kors-black-suede-caged-sandals-casey-strappy-high-heel-product-1-15278249-863304043.jpeg",
    "https://n.nordstrommedia.com/it/e3b8b4c9-6e1c-4c88-9b42-3081a8f4ee92.jpeg?h=368&w=240&dpr=2",
    "https://cdn.cliqueinc.com/posts/287908/best-slide-sandals-287908-1677700733356-main.1200x0c.jpg?interlace=true&quality=70",
    "https://i.pinimg.com/736x/93/7b/4d/937b4d0eb17f1a16ac32b25a5a87913a.jpg",
    "https://product-images.therealreal.com/MIC47800_3_enlarged.jpg",
];

const dressesImages = [
    "https://i.pinimg.com/originals/02/5b/62/025b628f22c7bb943ca4f55884b742e5.jpg",
    "https://i.pinimg.com/originals/d8/ff/b4/d8ffb49807827c1390f2c5864cbeb806.jpg",
    "https://i.pinimg.com/originals/5e/b7/ed/5eb7ed9bd55e6dad3cc39d826b235c53.png",
    "https://serenabutelondon.com/cdn/shop/files/SS25_Satin_Slip_Dress_Charcoal_1.jpg?v=1740502078",
    "https://i.pinimg.com/736x/20/6f/03/206f0315fd3df243997809d4f40277db.jpg",
    "https://40aee210544b5b2e713c-30cd56842bbd3fae7d05b019155315a5.ssl.cf2.rackcdn.com/product-hugerect-491734-13575-1429199491-1fcf80b06474f5a5f9ddda10a0e49f3f.jpg",
    "https://stylesatlife.com/wp-content/uploads/2022/08/Bandage-bodycon-spaghetti-strap-dress.jpg",
    "http://image26.stylesimo.com/o_img/2017/11/22/246945-10488297/women-s-v-neck-half-sleeve-a-line-prom-dress.jpg",
    "https://xcdn.next.co.uk/common/Items/Default/Default/ItemImages/AltItemZoom/989545s4.jpg",
    "https://img.shopstyle-cdn.com/sim/27/8b/278bbf827b914f7fa90ca467625493d3_best/harmony-floral-shirtdress.jpg",
    "https://i.pinimg.com/originals/be/4b/47/be4b47471c3134036bdc58fb90e0e438.jpg",
    "https://www.monsoon.co.uk/dw/image/v2/BDLV_PRD/on/demandware.static/-/Sites-monsoon-master-catalog/default/dw78c49308/images/large/23_20000630046_3.jpg?sw=1920&sh=2460&sm=cut",
    "https://www.sentani.com.au/cdn/shop/products/carmi-fitted-off-shoulder-satin-formal-dress-po979-975895.jpg",
    "https://i.pinimg.com/736x/53/cd/21/53cd21c0b787d32af97249cba33223a7.jpg",
    "https://cdn-img.prettylittlething.com/f/b/d/f/fbdf9b824eb68e6376d6de7f4f11e1e089f250a0_CLW5331_1.jpg",
    "https://cdn.cliqueinc.com/posts/289030/best-knit-dresses-289030-1697171389901-main.1200x0c.jpg?interlace=true&quality=70",
    "https://n.nordstrommedia.com/it/ba3a8c1a-545b-40fe-acad-45c7a236cd0d.jpeg?h=368&w=240&dpr=2",
    "https://www.theknot.com/tk-media/images/8b3e57b1-cb16-4ac3-920d-c17744fa886b~rs_768.h",
    "https://i.pinimg.com/originals/e3/db/04/e3db04c5dd182f17744b01ae40178238.jpg",
    "https://i.pinimg.com/736x/05/79/f8/0579f8d9c9e3d8010b4c361d93e2d651.jpg",
    "https://i.pinimg.com/originals/38/10/19/381019a0aee0fc542c03b0d21cd271fa.png",
    "https://www.veromoda.in/cdn/shop/files/131924201_g2.jpg?v=1745661690&width=1080",
    "https://i.pinimg.com/originals/2b/7f/a5/2b7fa5a2d7c77a894acb38d2135144c5.jpg",
    "https://cdn-img.prettylittlething.com/c/d/a/e/cdaeae5614053fb67bc361a1ea6b8a6c6c775927_cnl5739_1.jpg?imwidth=600",
    "https://www.pocoko.com/wp-content/uploads/2025/02/Forest-Green-with-Red-Flowers-Floral-Lace-Embroidered-Dress-8-878x1536.jpeg",
];

const accessoriesImages = [
    "https://www.itysilk.com/media/catalog/p/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/b/1b203-white-2.jpg",
    "https://i.pinimg.com/736x/23/7a/09/237a09f57290e0e142df1bc7750657a7.jpg",
    "https://cdn.shopify.com/s/files/1/0670/0433/files/Kicker_Limited_Edition_09062018.jpg?v=1536268406",
    "https://assets.maisoncashmere.com/media/catalog/product/mobilegallery/ribbed-gloves-cashmere-womens-long.jpg",
    "https://www.lulus.com/images/product/xlarge/7290141_1481236.jpg?w=560",
    "https://wallpapercave.com/wp/wp8824864.png",
    "https://images.squarespace-cdn.com/content/v1/53dcd8fee4b071b54b3296c9/1564348592934-A1XR18ZG46R45KYRLCXQ/Light+Grey+designer+lambswool+pom+pom+hat%2C+by+Collingwood-Norris.+Luxury+Knitwear+made+in+Scotland.jpg",
    "https://cdn.cliqueinc.com/posts/281389/best-designer-wallets-281389-1616619919451-main.750x0c.jpg?interlace=true&quality=70",
    "https://www.kcchicdesigns.com/cdn/shop/files/AL1A5025.jpg?v=1703258876&width=1445",
    "https://raven.contrado.app/resources/images/2020-6/149334/luxury-leather-keychain-906656_l.jpg?w=550&h=800&fit=crop&dpr=1",
    "https://i.etsystatic.com/25593781/r/il/02fb5c/2935988799/il_1140xN.2935988799_sdxt.jpg",
    "https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_683,h_1024/https://thegraydetails.com/wp-content/uploads/2023/03/luxury-card-case-holders-683x1024.png",
    "https://cdna.lystit.com/photos/aedc-2014/06/26/mango-pink-nylon-cosmetic-bag-product-1-21177803-2-551453296-normal.jpeg",
    "https://imagedelivery.net/0ObHXyjKhN5YJrtuYFSvjQ/i-10c9a16f-17fa-4022-bd15-695c8609d31c-luxury-leather-passport-cover-with-card-slots-hide-handmade/display",
    "https://selenichast.com/cdn/shop/products/26_e4c4177f-802b-41be-926e-08494fa876c0_1800x1800.jpg?v=1636442645",
    "https://cdn.cliqueinc.com/posts/299189/best-designer-headbands-299189-1649880213171-main.700x0c.jpg",
    "https://aoifemullane.ie/wp-content/uploads/2023/01/59ca7eb3-1240-4034-bc5a-91e36fa9bbe3.jpeg",
    "https://i.pinimg.com/originals/d2/dc/97/d2dc97aa5486d63bdb050a67a27e31bc.jpg",
    "https://uniworthdress.com/uploads/product/TIP2312.....jpg",
    "https://images.stockcake.com/public/9/e/1/9e1fc968-4350-4831-ad56-ea19e67dbf69_large/elegant-cufflinks-set-stockcake.jpg",
    "https://i.pinimg.com/originals/e9/f2/4c/e9f24c020d4152842e3bc33a6dc5f71a.png",
    "https://2jour-concierge.com/cdn/shop/collections/HV380M_GU_Polo_marble_rectangular_mini_valet_tray_GREEN_GUATEMALA_BRASS_LIFESTYLE01.jpg?v=1707244618&width=1070",
    "https://i.pinimg.com/originals/3b/2c/cf/3b2ccfcb09565cfbed74af167f6a3931.jpg",
    "https://blucheez.fashion/cdn/shop/files/BPS-002-SG-WEB-01.webp?v=1724839271&width=600",
    "https://oracleoftime.com/wp-content/uploads/2023/11/The-Strap-Tailor-Ostrich-Shin-Strap-1-768x1024.jpg",
];

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
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

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
