// Men's luxury products - 100 unique items with high-quality images
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

// Men's Watches Images
const watchesImages = [
    "https://timehouse.s3.me-central-1.amazonaws.com/uae-images/27TlkvyF91t.jpg",
    "https://dynamic.zacdn.com/3_Mj36s7JjiwR_P1O4y8ohsDWtg=/filters:quality(70):format(webp)/https://static-my.zacdn.com/p/orient-1794-9955142-1.jpg",
    "https://embed.widencdn.net/img/citizenwatch/8usvywgo7q/1000px/Promaster 1000M Professional Diver.png?u=41zuoe",
    "https://i.pinimg.com/736x/10/99/2c/10992c15101a98c91c816d380072f753.jpg",
    "https://www.my-watchsite.com/15684-large_default/ocean-sport-chronograph.jpg",
    "https://i.pinimg.com/originals/d5/73/71/d5737151a68a2ec6eb3ea2fdde81a685.jpg",
    "https://m.media-amazon.com/images/I/71oUf9HimdL._AC_SL1500_.jpg",
    "https://i5.walmartimages.com/seo/OLEVS-Men-s-Watches-Chronograph-Multifunction-Sport-Silicone-Luxury-Diamond-Moon-Phase-Quartz-Male-Watch-Waterproof-Wrist-Watch_4c329867-a789-417d-81ba-df807e9a4c5f.ea7eb6088d346d0e80c2c0b76f54bb41.jpeg",
    "https://mywatchllc.com/cdn/shop/files/IMG_9287_9929a6a0-e2a0-4b64-9a3f-a74e977abbc1.jpg?v=1755785803",
    "https://i.pinimg.com/736x/70/93/13/709313120a6d1b1abc29d9b50dce631e.jpg",
    "https://worldofluxuryus.com/cdn/shop/files/2_5217aa81-c5b9-42d4-bb56-c5e6eb5cf2cb.jpg?v=1758714761",
    "https://m.media-amazon.com/images/I/61NpvvWfFvL._AC_UY1000_.jpg",
    "https://www.jurawatches.co.uk/cdn/shop/files/TAGHeuerWatchFormula1AutomaticChronographxOracleRedBullRacingCBZ2080.FT80914.png?v=1737538424",
    "https://i.pinimg.com/736x/a0/eb/1b/a0eb1b876b33024c494690a2506e56dc.jpg",
    "https://m.media-amazon.com/images/I/71txlyhbZcL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81M7baAjK5L._AC_.jpg",
    "https://down-my.img.susercontent.com/file/cn-11134208-7ras8-m4s9d2snzh87a6",
    "https://m.media-amazon.com/images/I/71V-7kkDK1S._AC_UL1300_.jpg",
    "https://www.ablogtowatch.com/wp-content/uploads/2016/03/Tudor-Heritage-Black-Bay-Bronze-79250BM-5.jpg",
    "https://watchranker.com/wp-content/uploads/2020/11/Blancpain.jpg",
];

// Men's Bags Images
const mensBagsImages = [
    "https://i.etsystatic.com/8115148/r/il/03d916/1741333308/il_fullxfull.1741333308_tfr4.jpg",
    "https://i.pinimg.com/originals/ea/ad/43/eaad437f338db02cc1fe2ed1d34d5660.png",
    "https://www.hugme.fashion/image/cache/catalog/Leather Bag/LB57/amb74_3-800x1019.jpg",
    "https://mensflair.com/wp-content/uploads/2022/12/WeekenderBagsEdit5.jpg",
    "https://i.etsystatic.com/10661967/r/il/9a0256/4244557858/il_fullxfull.4244557858_240p.jpg",
    "https://cdna.lystit.com/400/500/tr/photos/harrods/ba3608a6/dunhill-black-Leather-Cadogan-Document-Case.jpeg",
    "https://m.media-amazon.com/images/I/71O5XNpebbL._AC_SL1500_.jpg",
    "https://cdna.lystit.com/photos/matchesfashion/14af3055/gucci-black-Gg-Supreme-Leather-Cross-body-Bag.jpeg",
    "https://assets.paulsmith.com/paul-smith-products/f_jpg,q_auto,w_1228/v1746718275/STILL/M1A/M1A-8158-TLEPIP-62-0/M1A-8158-TLEPIP-62-0_70",
    "https://i.pinimg.com/originals/26/fd/c1/26fdc1f5f94da7456447125c6091d71a.jpg",
    "https://m.media-amazon.com/images/I/51cYl00KmnL._AC_SL1500_.jpg",
    "https://i.pinimg.com/originals/e0/3a/57/e03a573573a7e46e66ab55e656c8d314.jpg",
    "https://i.pinimg.com/originals/a3/27/e2/a327e289e98b889a2245b0a66b68a316.jpg",
    "https://i.pinimg.com/originals/fd/59/22/fd5922da47781374ef52af1258e917ff.png",
    "https://i.etsystatic.com/10448437/r/il/6cc240/1057940132/il_570xN.1057940132_f4mx.jpg",
    "https://i.etsystatic.com/18299285/r/il/910dac/3636133059/il_fullxfull.3636133059_grbg.jpg",
    "https://img.shopstyle-cdn.com/sim/c6/e6/c6e6e795234e9b61ce1f5ec446e9d6d5_best/lakeland-leather-discoverer-large-leather-holdall.jpg",
    "https://i.pinimg.com/originals/43/aa/f2/43aaf20777251db18382306e2b9fb98b.jpg",
    "https://i.pinimg.com/originals/d6/65/76/d66576fdfd366ce1da50b366254126a0.jpg",
    "https://media.bergdorfgoodman.com/images/f_auto,q_auto:low,ar_5:7,c_fill,dpr_2.0,w_720/01/2832691_100106_a/giorgio-armani-mens-deer-leather-carryall-",
];

// Men's Shoes Images
const mensShoesImages = [
    "https://i.pinimg.com/originals/0e/5a/a2/0e5aa290eb6c90bcc3c7b734bf022660.jpg",
    "https://www.secretsales.com/cdn-cgi/image/width=640,height=800,fit=contain,format=auto/https://media.secretsales.com/catalog/product/b/5/b5299ed6ccc64e6497be06f9b081cf14.jpg",
    "https://cdna.lystit.com/photos/lanecrawford/3f00fd7b/allen-edmonds--spring-Street-Tassel-Leather-Loafers.jpeg",
    "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/14082248/2022/3/15/5db67ddc-9415-4dc3-a970-6c3636b138391647327773096SaintGMenBlackSolidLeatherFormalChelseaBoots1.jpg",
    "https://i0.wp.com/sveltemag.com/wp-content/uploads/2022/01/black-monk-shoes.jpg?resize=564%2C705&is-pending-load=1#038;ssl=1",
    "https://cdn.luxe.digital/media/2020/03/04095155/loafers-best-men-shoes-luxe-digital.jpg",
    "https://i.pinimg.com/originals/44/42/de/4442deed26a8c9d86f2d485be3a38e41.jpg",
    "https://i.pinimg.com/originals/1b/69/43/1b6943d513943a0412f09e0e0d366399.jpg",
    "https://i.pinimg.com/originals/5d/28/0a/5d280aa325d215a2a76828fe54c76f09.jpg",
    "https://i.pinimg.com/originals/92/d5/a6/92d5a61c0489b6469162246342274c41.jpg",
    "https://cdn.suitsupply.com/image/upload/b_rgb:efefef,c_fill,w_2600,h_3597/b_rgb:efefef,c_pad,dpr_1,w_850,h_1176,f_auto,q_auto,fl_progressive/products/Shoes/default/FW1331_35.jpg",
    "https://i.etsystatic.com/39126012/r/il/e45bd6/4545804644/il_fullxfull.4545804644_jn4r.jpg",
    "https://i.pinimg.com/originals/5c/67/7b/5c677b1ce69bc782efa4b1221332a812.jpg",
    "https://www.xposedlondon.com/cdn/shop/files/MAIN_310415e1-3faf-4ca5-9d9e-68bca6f0243e.jpg?v=1718720779",
    "https://media.bergdorfgoodman.com/f_auto,q_auto:low,ar_5:7,c_fill,dpr_2.0,w_720/01/bg_4669849_100134_z",
    "https://i.pinimg.com/originals/30/e1/aa/30e1aa23dd749fc1c3720fc2448cb922.jpg",
    "https://brabions.com/cdn/shop/products/image_12c9e16a-60dc-4b06-970e-1220a6a111d6.jpg?v=1594218652&width=1100",
    "https://www.santimon.com/cdn/shop/files/A4_1ffb60b5-5ad8-4dd0-8103-15aab61475f7.jpg?v=1701156777",
    "https://assets.digitalcontent.marksandspencer.app/images/w_1024,q_auto,f_auto/MS_10_T83_8927B_Y0_X_EC_0/Leather-Side-Zip-Chelsea-Boots",
    "https://i.ebayimg.com/images/g/sM4AAOSw2C1juWZq/s-l1600.jpg",
];

// Men's Suits Images
const suitImages = [
    "https://i.pinimg.com/originals/cd/26/ef/cd26ef86c48ac24bfc9131682286878e.jpg",
    "https://nemersaade.com/wp-content/uploads/2022/11/DSC3843-scaled.jpg",
    "https://i.pinimg.com/originals/78/be/c0/78bec05f66cbbf8a157eda312d99c9ac.jpg",
    "https://content.moss.co.uk/images/extraextralarge/966916009_02.jpg",
    "https://i.pinimg.com/originals/b5/d0/ba/b5d0ba0fb145be0f3a90ba846c7f53e2.jpg",
    "https://i.etsystatic.com/37908468/r/il/b2b404/4377755645/il_fullxfull.4377755645_mt1r.jpg",
    "https://handcmediastorage.blob.core.windows.net/productimages/CO/COCLE316-B52-174695-1400px-1820px.jpg",
    "https://content.moss.co.uk/images/extraextralarge/967009422_02.jpg",
    "https://menstuxedousa.com/cdn/shop/files/TailoredFit5.jpg?v=1716462081",
    "https://assets.paulsmith.com/paul-smith-products/f_jpg,q_auto,w_828/v1697545495/MODEL/ECOM/M1R/M1R-1841P-L01346-79/M1R-1841P-L01346-79_11",
    "https://media.bergdorfgoodman.com/f_auto,q_auto:low,ar_5:7,c_fill,dpr_2.0,w_720/01/bg_4791633_100106_a",
    "https://i.pinimg.com/originals/a8/e3/f8/a8e3f80e053265fafc091e12ce3da170.jpg",
    "https://i.pinimg.com/originals/fd/48/24/fd48248c8add51cfc018adda8e43aff6.jpg",
    "https://universaltailor.com/wp-content/uploads/2018/08/how-to-wear-charcoal-grey-suit-for-business.jpg",
    "https://i.pinimg.com/originals/99/6c/a1/996ca171147beb0866090197418e44f5.jpg",
    "https://stylesatlife.com/wp-content/uploads/2019/10/Designer-blazers-for-wedding-men.jpg",
    "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1443679_alternate10?$rl_4x5_pdp$",
    "https://i.pinimg.com/originals/e1/ea/be/e1eabe852731c71c9f44a24adb575656.jpg",
    "https://i.pinimg.com/originals/f8/7b/98/f87b9861721cd67b996d6bad5f5638c3.jpg",
    "https://image.menswearhouse.com/is/image/TMW/TMW_3YC2_14_NAUTICA_2_PIECE_SUITS_BLUEPOSTMAN_MAIN?imPolicy=pgp-sm",
];

// Men's Accessories Images
const mensAccessoriesImages = [
    "https://i.pinimg.com/736x/e0/bf/44/e0bf447e38c488ca98c3cf1db99e5c6d--designer-ties-neck-ties.jpg",
    "https://i.etsystatic.com/42123138/r/il/0fc956/6130426131/il_fullxfull.6130426131_4ced.jpg",
    "https://media.neimanmarcus.com/f_auto,q_auto/01/nm_4488750_100109_m",
    "https://www.faribasoltani.com/wp-content/uploads/2018/07/Navy-Geometric-Silk-Pocket-Square-1-700x905.jpg",
    "https://static.toiimg.com/photo/109371406/109371406.jpg",
    "https://image.menswearhouse.com/is/image/TMW/TMW_837B_25_PRONTO_UOMO_TIE_BARS_TIE_CHAINS_SILVER_MAIN",
    "https://i.etsystatic.com/54717487/r/il/72fbde/6459088557/il_1080xN.6459088557_kv4g.jpg",
    "https://i.pinimg.com/originals/a3/71/51/a37151d924dc909fbc5e0c3911237637.png",
    "https://i.pinimg.com/originals/36/51/cd/3651cd311aa591c564a86573e21ebd9d.jpg",
    "https://www.aeuluxury.com/wp-content/uploads/2024/01/975804_BLAC_1__52902.1700140167.jpg",
    "https://www.tommyowenseyewear.com/cdn/shop/products/collarstays-male-model-collar-tommyowens_1800x.jpg?v=1646693525",
    "https://chiqueandsleekin.com/wp-content/uploads/2020/06/il_fullxfull.1948429017_3vgz-scaled-1.jpg",
    "https://i.pinimg.com/originals/2f/d9/86/2fd9866a2fd74c5685bcbe5efa19212f.jpg",
    "https://images.nexusapp.co/assets/83/63/8f/55466066.jpg",
    "https://i.pinimg.com/736x/f6/67/64/f667649f10c91bc3c8d5f65c173b4107.jpg",
    "https://media.neimanmarcus.com/f_auto,q_auto/01/nm_4335557_100134_m",
    "https://longvadon.com/cdn/shop/files/closeup_apple_watch_mens_leather_v1logo_4x5_a82e1635-67f3-4678-aa65-a77a1c2ba200.jpg?v=1744970036",
    "https://i.pinimg.com/originals/27/46/c4/2746c4e006f2a01a338cd43eda39ec5e.jpg",
    "https://product-images.therealreal.com/LOU117012_1_enlarged.jpg",
    "https://i.etsystatic.com/46290522/r/il/bb7d6d/5800104386/il_1080xN.5800104386_amio.jpg",
];

// Product Names
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

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

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
