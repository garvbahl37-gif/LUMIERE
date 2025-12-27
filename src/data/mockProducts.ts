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
    "https://i.etsystatic.com/45884032/r/il/514d77/5181141284/il_1080xN.5181141284_lnm0.jpg",
    "https://www.ak-studio.shop/cdn/shop/files/8.jpg?v=1752311478&width=1445",
    "https://images-na.ssl-images-amazon.com/images/I/61-V-aDj30L._AC_UL1100_.jpg",
    "https://i.etsystatic.com/34530147/r/il/6158d1/6248389650/il_1080xN.6248389650_ocx5.jpg",
    "https://i.etsystatic.com/18299285/r/il/e9c45d/3246100217/il_fullxfull.3246100217_dnls.jpg",
    "https://assets.timberland.eu/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1715014581/TB0A61JU929-HERO/Tuckerman-Leather-Bucket-Bag-for-Women-in-Beige.png",
    "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/m/14/8bc14664-6f16-4c70-b5ab-01948b0d0c9d.jpg",
    "https://media.kurtgeiger.mx/product/9985663979/25/megan-envelope-clutch-silver-synthetic-carvela-9985663979?w=2560",
    "https://i.etsystatic.com/18642489/r/il/c30a95/5738911657/il_fullxfull.5738911657_lf75.jpg",
    "https://i.etsystatic.com/21697359/r/il/e7b603/4603792727/il_fullxfull.4603792727_nlsn.jpg",
    "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/s/04/940e7c53-40da-49df-9c43-a9da150c759b.jpg",
    "https://i.etsystatic.com/34034694/r/il/81530f/4479375739/il_1080xN.4479375739_dhd7.jpg",
    "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/17836270/2022/4/9/c183bf22-0d7c-420f-b5d6-af4680b7a7bb1649505475670AthenaSoftPinkStructuredBoxBag1.jpg",
    "https://a.1stdibscdn.com/fendi-purple-embellished-sequin-purple-calfskin-leather-baguette-for-sale-picture-12/v_1702/v_180068821671638839425/i12_master.jpg",
    "https://cdn.notonthehighstreet.com/fs/9d/c1/3ec2-5c42-4964-971c-9a29f834775d/original_black-personalised-leather-crossbody-camera-bag.jpg",
    "https://i.etsystatic.com/10108699/r/il/27c4b0/1958044607/il_1140xN.1958044607_sgob.jpg",
    "https://i.etsystatic.com/5480093/r/il/69425b/75789335/il_fullxfull.75789335.jpg",
    "https://static.topvintage.net/shop-product/45772-Kaytie-Vintage-Frame-Kissslock-Bag-Black-212-10-13378-20140719-0025W-full.jpg",
    "https://product-images.therealreal.com/PRA114304_3_enlarged.jpg",
    "https://img1.etsystatic.com/000/0/5264484/il_fullxfull.84271817.jpg",
    "https://i.etsystatic.com/35419983/r/il/294323/5661905691/il_fullxfull.5661905691_mzwk.jpg",
    "https://i.etsystatic.com/19750160/r/il/80320a/2210951784/il_794xN.2210951784_sduu.jpg",
    "https://ae01.alicdn.com/kf/Scf8e17bff1df4577877f93dafee30717l/Fashion-Female-Belt-Bags-Luxury-Ladies-Fanny-pack-And-Phone-Pack-Brand-Designer-Waist-Bags-High.jpg",
    "https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-monogram-handle-trunk-bag--M11118_PM1_Side view.png?wid=2400&hei=2400",
    "https://blog.fashionphile.com/wp-content/uploads/2023/07/this-is-a-studio-image-of-diffrent-kelly-bags-in-the-colors-beige-blue-and-pink-.jpg",
];

const jewelryImages = [
    "https://a.1stdibscdn.com/18-karat-white-gold-diamond-tennis-bracelet-for-sale/1121189/j_101896721597996077692/10189672_master.jpg",
    "https://sameera.digiway.co.in/wp-content/uploads/2025/06/w5.jpeg",
    "https://i.etsystatic.com/16794142/r/il/9963f3/1578050123/il_1080xN.1578050123_2j2m.jpg",
    "https://a.1stdibscdn.com/vintage-sapphire-cocktail-statement-ring-820ct-antique-victorian-14k-enamel-for-sale/j_29712/j_167063121660577581869/j_16706312_1660577582148_bg_processed.jpg",
    "https://a.1stdibscdn.com/448-carats-total-round-diamond-platinum-tennis-bracelet-for-sale/1121189/j_127606221627110343743/12760622_master.jpg",
    "https://i.etsystatic.com/9404556/r/il/e54b52/730892297/il_1080xN.730892297_aaqi.jpg",
    "https://i.etsystatic.com/6155585/r/il/9dcbbc/2134981043/il_fullxfull.2134981043_1ons.jpg",
    "https://i.etsystatic.com/22077692/r/il/da59c3/4050940962/il_fullxfull.4050940962_ct3n.jpg",
    "https://a.1stdibscdn.com/204-carat-round-diamond-solitaire-pendant-necklace-for-sale-picture-5/j_6093/j_51867621540500580562/20181025_121317_master.jpg?width=768",
    "https://a.1stdibscdn.com/archivesE/upload/1121189/j_61690621552114802736/6169062_master.jpg",
    "https://i.etsystatic.com/12695711/r/il/f0a0be/2658645524/il_fullxfull.2658645524_ibgh.jpg",
    "https://i.etsystatic.com/22694762/c/1754/1754/299/735/il/e41e10/6405923118/il_800x800.6405923118_nvma.jpg",
    "https://i.etsystatic.com/9718848/r/il/e73fa3/1819993896/il_1080xN.1819993896_qu47.jpg",
    "https://a.1stdibscdn.com/archivesE/upload/1121189/j_97011021662743371640/9701102_datamatics.jpeg?width=768",
    "https://i.etsystatic.com/28302045/r/il/897bc1/5038133467/il_1080xN.5038133467_mtb2.jpg",
    "https://i.etsystatic.com/8274415/r/il/5b7698/2476478010/il_1080xN.2476478010_9rd6.jpg",
    "https://www.zales.com/productimages/processed/V-20357926_1_800.jpg?pristine=true",
    "https://www.diamondmansion.com/media/catalog/product/cache/5a3741af3b52fc8df45571a3fad389d7/r/o/round_cut_diamond_eternity_ring_unique.jpg",
    "https://cdn.shopify.com/s/files/1/0377/8309/products/14K_Gold_Square_Chain_Bracelet_122000-YG.jpg?v=1519844351",
    "https://a.1stdibscdn.com/archivesE/upload/1121189/j_34087131508853110833/3408713_master.jpg",
    "https://i.etsystatic.com/25336635/r/il/5ef9be/5552305950/il_1080xN.5552305950_r56n.jpg",
    "https://www.signetcircle.com.au/cdn/shop/products/IMG_4907.jpg?v=1596166822",
    "https://i.etsystatic.com/17488527/r/il/ad1286/4807949450/il_1080xN.4807949450_5kgj.jpg",
    "https://i.pinimg.com/originals/2f/9e/d0/2f9ed09d33664ff88497f57c79db5f13.jpg",
    "https://www.fashiongonerogue.com/wp-content/uploads/2019/08/AuRate-Gold-Collar-Necklace.jpg",
];

const shoesImages = [
    "https://cdn.lookastic.com/red-leather-pumps/dorissima-patent-red-sole-pump-red-original-326886.jpg",
    "https://m.media-amazon.com/images/I/61DxiyO5MaL._AC_UY900_.jpg",
    "https://cdn.media.amplience.net/i/clarks/26181407_GW_1?fmt=auto&img404=imageNotFound&w=2088&qlt=default",
    "http://www.simmi.com/cdn/shop/files/mariana_nude_81dd318b-b869-4710-9255-c15d6c2a3040.jpg?v=1736189656",
    "https://cdnd.lystit.com/photos/cfce-2016/01/26/lanvin-blush-bow-embellished-leather-ballet-flats-pink-product-0-677470547-normal.jpeg",
    "https://www.reddress.com/cdn/shop/files/6-4-24253455_1024x1024@2x.jpg?v=1718650229",
    "https://imgix.bustle.com/uploads/image/2022/1/6/9100c53c-7a61-400b-960a-58df8682ead6-screen-shot-2022-01-06-at-95841-am.png?w=1000&h=581&fit=crop&crop=faces&auto=format%2Ccompress&q=50&dpr=2",
    "https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/01/P00940777_d1.jpg",
    "https://i5.walmartimages.com/seo/AURIGATE-Sandals-for-Women-Dressy-Casual-Summer-High-Heel-Ankle-Strap-Block-Chunky-Open-Toe-Sandals-Party-Dress-Pumps-Shoes_c4eb6839-bd53-4530-9474-a006de15897a.99d7df4ad0a105824d51fc36095ea0c4.jpeg",
    "https://i5.walmartimages.com/asr/95ce7a63-069b-4dd8-8cfe-9583110ae09d_1.8e310b3eeb9a14745bbc6bc30adfc94b.jpeg",
    "http://img.shein.com/images/shein.com/201607/1467336651386614632.jpg",
    "https://cdn-img.prettylittlething.com/b/7/1/6/b716074f370aa8a67c06d74df99937b28b11c56d_CLS4876_1.JPG",
    "https://i5.walmartimages.com/seo/Atoshopce-Mules-for-Women-Round-Toe-Slip-On-Flat-Mules-Summer-Shoes-for-Women_ffbb6b08-8cc2-4a7f-8279-0c2b027b6486.127583abeea0ce65c45115c74c5a1c0e.jpeg",
    "https://i.pinimg.com/originals/e0/c3/aa/e0c3aaa5e41e7c6a5fcde8a27f5ab36e.jpg",
    "https://cdna.lystit.com/photos/nordstrom/921783ae/aldo-designer-Black-Moimas-Lug-Sole-Combat-Boot.jpeg",
    "https://product-images.therealreal.com/MOO68700_2_enlarged.jpg",
    "https://i.pinimg.com/originals/f9/d3/95/f9d3950edd149bb7a6d8f7c8fd77a189.jpg",
    "https://cdn.shopify.com/s/files/1/0277/3978/3273/products/stefania-studded-gold-metallic-gladiator-flat-sandal-shoes-elenista-656554_1024x1024.jpg?v=1595898600",
    "https://holloshoe.com/cdn/shop/files/Brown_Leather_Chelsea_Boots_6.jpg?v=1731935370&width=1646",
    "https://i5.walmartimages.com/asr/e66d7e0b-c29b-4dab-b325-856ac594fe29_1.4728716ae01f755ddfb10abe4d7bda8e.jpeg",
    "http://cdnd.lystit.com/photos/2013/11/25/michael-kors-black-suede-caged-sandals-casey-strappy-high-heel-product-1-15278249-863304043.jpeg",
    "https://m.media-amazon.com/images/I/81lLIybxM+L._AC_SR768,1024_.jpg",
    "https://i.pinimg.com/originals/65/19/73/651973847547cb5a735cb42554da1778.png",
    "https://i.etsystatic.com/8660202/r/il/09d645/1675066675/il_1588xN.1675066675_83yd.jpg",
    "https://i.etsystatic.com/8379098/r/il/855f92/4520632107/il_1080xN.4520632107_cpuf.jpg",
];

const dressesImages = [
    "https://i.etsystatic.com/18771955/r/il/52b0e8/3206894791/il_1588xN.3206894791_2pdw.jpg",
    "https://i.etsystatic.com/7012607/r/il/56fd22/5963483037/il_1080xN.5963483037_kk9m.jpg",
    "https://www.maysange.com/4018-large_default/white-cocktail-dress-with-tatoo-lace-sleeves.jpg",
    "https://i.pinimg.com/originals/3b/7c/bf/3b7cbfbb2e46790d0001491b12b4de22.png",
    "https://i.pinimg.com/originals/85/5e/4b/855e4bd09ff80f7f8ad26accc097ea94.jpg",
    "https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2016/08/04/source-img/20160804115250_11854.jpg",
    "https://cdn-img.prettylittlething.com/2/c/0/8/2c08a214e0b2090c04ae35702f14828815346c11_cnb9886_3.jpg?imwidth=2048",
    "http://ilovemodesty.com/cdn/shop/files/navy_chiffon_classic_a-line_dress.jpg?v=1735384241",
    "https://romans-cdn.rlab.net/images/original/da748629-1181-4fc5-a7ad-ef4230e1de21.jpg",
    "https://cdn-img.prettylittlething.com/5/1/5/d/515d19da9333eec54c1695d647264f6714a26967_cmf4990_1.jpg",
    "https://www.lulus.com/images/product/xlarge/3564310_708132.jpg?w=560",
    "https://i.etsystatic.com/9340124/r/il/536dd3/2485321322/il_794xN.2485321322_qp5p.jpg",
    "https://cdn.shopify.com/s/files/1/0070/8853/7651/files/05002-7568_1_RED_AirlieFormalGlitterOffTheShoulderDress.webp?v=1722486687",
    "https://cdn.shopify.com/s/files/1/0070/8853/7651/files/05103-5847_1_YELLOW_AlwaysEffortlessHalterBodyconMiniDress.webp?v=1739376193",
    "https://cdn-img.prettylittlething.com/8/a/9/e/8a9e5bf5d0bf3dd0ba9a3c2211adb6334b78a9c6_cnf4223_1.jpg",
    "https://www.lulus.com/images/product/xlarge/8006301_1602416.jpg",
    "https://www.lulus.com/images/product/xlarge/5333796_978262.jpg?w=560",
    "https://www.davidresses.com/images/uploads/cute-dresses/strapless-floor-length-prom-dress-with-sequin-475.jpg",
    "https://entrepreneurmindz.com/wp-content/uploads/2024/08/White-fitted-bandage-dress-640x960.jpg",
    "https://i5.walmartimages.com/seo/Vintage-Tea-Dresses-for-Women-1950-s-Floral-Sleeveless-V-Neck-Retro-Swing-Prom-A-line-Midi-Cocktail-Party-Dress_b509bdbd-7439-4bc0-bd31-b5fe4b518f92.a96fd2a04cb62a57292b2e07fca3429e.jpeg",
    "https://www.lulus.com/images/product/xlarge/5203950_1064502.jpg?w=560",
    "https://cdna.lystit.com/520/650/n/photos/spanx/6a5d7b80/spanx-Spanx-True-Red-The-Perfect-Fit-Flare-Dress.jpeg",
    "https://www.net-a-porter.com/variants/images/1647597313489881/ou/w2000_q60.jpg",
    "https://n.nordstrommedia.com/id/sr3/15351046-3721-40d1-b5d9-a58bb7fc1773.jpeg?h=365&w=240&dpr=2",
    "https://dbrweddings.com/media/catalog/product/o/c/occasions-gold-embroidery-princess-evening-dress_01.jpg",
];

const accessoriesImages = [
    "https://i0.wp.com/carredeparis.me/wp-content/uploads/2015/11/luna-park-hermes-paris-36-inch-silk-scarf.jpg?fit=2325%2C2325&ssl=1",
    "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1623168904/411924_CWC1N_1000_008_100_0000_Light-Belt-with-Interlocking-G-buckle.jpg",
    "https://cdnc.lystit.com/photos/2011/12/10/tom-ford-shiny-black-nikita-cat-eye-sunglasses-product-1-2522421-654450522.jpeg",
    "https://madigancashmere.com/cdn/shop/files/Luxury_Cashmere_Gloves_Grey.webp?crop=center&height=843&v=1726016069&width=562",
    "https://i.etsystatic.com/6871773/r/il/37405b/5491349596/il_1080xN.5491349596_3au1.jpg",
    "https://i.etsystatic.com/26303843/r/il/32e422/3002638555/il_570xN.3002638555_m76h.jpg",
    "https://i.pinimg.com/736x/1b/68/9b/1b689b01559d2a28f4c4802d250bb9e5.jpg",
    "https://cdn.shopify.com/s/files/1/0298/0353/products/Vintage_Dark_Brown_Leather_Mens_Phone_Wallet_Brown_Clutch_Bag_Bifold_Zipper_Long_Wallet_For_Men_5_1024x1024.jpg?v=1584757634",
    "https://m.media-amazon.com/images/I/716JJ+eReaL._AC_.jpg",
    "https://i.etsystatic.com/20780252/r/il/82045c/2873503052/il_fullxfull.2873503052_ske4.jpg",
    "https://i.etsystatic.com/42685345/c/1538/1538/230/62/il/d8a045/4807685130/il_600x600.4807685130_eh3b.jpg",
    "https://i.etsystatic.com/9876280/r/il/72d471/1973956207/il_1588xN.1973956207_cogd.jpg",
    "https://i.etsystatic.com/21404101/r/il/3408fa/2083870028/il_fullxfull.2083870028_cnkp.jpg",
    "https://i.etsystatic.com/51990550/r/il/d55237/6340985063/il_1080xN.6340985063_bq4j.jpg",
    "https://i.etsystatic.com/42178427/r/il/a3863f/6534124216/il_1080xN.6534124216_fj08.jpg",
    "https://sino-silk.com/wp-content/uploads/2024/07/Wide-Knot-Silk-Headband.jpg",
    "https://m.media-amazon.com/images/I/811ZqZgQ4JL._SL1500_.jpg",
    "https://i.etsystatic.com/16951840/r/il/ff56b2/5415235439/il_fullxfull.5415235439_6elo.jpg",
    "https://static.antiquejewellerycompany.com/2020/03/ad45acc9-dsc03981-scaled.jpg",
    "https://www.thecufflinkstore.co.uk/cdn/shop/products/05-CUFFLINKS-BATCH-3-137-1400-web.jpg?v=1551387954",
    "https://m.media-amazon.com/images/I/61uSf2WN4eL._AC_SL1500_.jpg",
    "https://i.pinimg.com/originals/8a/7f/0f/8a7f0fbd292fe7117cca4e57abd551a9.jpg",
    "https://soxy.com/blogs/wp-content/uploads/2022/04/Designer-Umbrella-13.jpg",
    "https://bananarepublic.gap.com/webcontent/0052/475/675/cn52475675.jpg",
    "https://i.etsystatic.com/9688187/r/il/35dbb0/2482194409/il_1588xN.2482194409_jhao.jpg",
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

export const mockProducts: MockProduct[] = [
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

export default mockProducts;
