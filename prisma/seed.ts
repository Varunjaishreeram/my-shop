import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')
    await prisma.review.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()

    const products = [
        {
            name: "Amashay Churn",
            price: 180.00,
            quantity: '100gm',
            img: "/Amashay_Churn.jpg",
            category: "Digestion",
            description: "A potent Ayurvedic digestive powder crafted from rare Himalayan herbs. Specially formulated to soothe stomach discomfort, reduce bloating, and enhance overall digestion naturally.",
            howToUse: "Mix 1 teaspoon (approx. 5g) with a glass of lukewarm water. Consume twice daily, preferably 30 minutes after lunch and dinner.",
            benefits: ["Soothes indigestion and acidity.", "Reduces gas and bloating.", "Improves nutrient absorption.", "Promotes regular bowel movements."],
            ingredients: "Triphala, Hing, Ajwain, Saunf, Jeera, Pudina Satva, etc...",
        },
        {
            name: "Daant Manjan",
            price: 90.00,
            quantity: '50gm',
            img: "/Daant_Manjan.jpg",
            category: "Oral Care",
            description: "A herbal tooth powder enriched with cloves and neem for strong, healthy teeth and fresh breath. Naturally whitens and protects gums.",
            howToUse: "Take a small amount on a soft toothbrush or finger. Gently massage teeth and gums for 2 minutes. Rinse thoroughly.",
            benefits: ["Saves water compared to toothpaste.", "Strengthens teeth and gums.", "Fights bad breath.", "Helps prevent cavities.", "Natural whitening."],
            ingredients: "Neem Bark, Clove Oil, Babool Bark, Vajradanti, Mulethi, Camphor, etc...",
        },
        {
            name: "Face Pack",
            price: 160.00,
            quantity: '70gm',
            img: "/Face_Pack.jpg",
            category: "Skin Care",
            description: "Rejuvenating herbal face pack with Multani Mitti and Sandalwood for clear, radiant skin. Removes impurities and excess oil.",
            howToUse: "Mix 1-2 teaspoons with rose water or milk. Apply evenly on cleansed face. Leave for 15-20 mins. Rinse with cool water.",
            benefits: ["Deep cleanses pores.", "Controls excess oil and acne.", "Improves skin tone.", "Cooling and soothing."],
            ingredients: "Multani Mitti, Sandalwood Powder, Rose Petal Powder, Neem Powder, Turmeric, etc...",
        },
        {
            name: "Jodo Ka Tail",
            price: 180.00,
            quantity: '60ml',
            img: "/Jodo_Ka_Tail.jpg",
            category: "Pain Relief",
            description: "Warming Ayurvedic massage oil formulated to relieve joint and muscle discomfort. Infused with potent herbs for deep penetration.",
            howToUse: "Warm slightly. Massage onto affected joints for 10-15 minutes. Apply 2-3 times a day.",
            benefits: ["Soothes joint pain.", "Reduces muscle soreness.", "Improves flexibility.", "Strengthens bones and muscles."],
            ingredients: "Sesame Oil, Mahanarayan Oil, Wintergreen Oil, Eucalyptus Oil, Camphor, etc...",
        },
        {
            name: "Kesh Ratn Hair Oil",
            price: 360.00,
            quantity: '100ml',
            img: "/Kesh_Ratn.jpg",
            category: "Hair Care",
            description: "Nourishing herbal hair oil enriched with Bhringraj and Amla to promote healthy hair growth, reduce hair fall, and prevent premature graying.",
            howToUse: "Massage into scalp for 10-15 mins. Leave for an hour or overnight. Wash with herbal shampoo.",
            benefits: ["Reduces hair fall.", "Promotes thick growth.", "Nourishes scalp.", "Adds natural shine."],
            ingredients: "Coconut Oil, Sesame Oil, Bhringraj, Amla, Brahmi, Neem, Hibiscus, etc...",
        },
        {
            name: "Power Churan",
            price: 340.00,
            quantity: '70gm',
            img: "/Power_Churan.jpg",
            category: "Wellness",
            description: "An invigorating Ayurvedic blend to boost energy levels, improve stamina, and combat fatigue naturally.",
            howToUse: "Take 1 teaspoon with warm milk or water, preferably in the morning.",
            benefits: ["Enhances energy and stamina.", "Reduces fatigue.", "Improves concentration.", "Supports immunity."],
            ingredients: "Ashwagandha, Shatavari, Safed Musli, Kaunch Beej, Gokshura, etc...",
        },
        {
            name: "Rambaan Tail",
            price: 180.00,
            quantity: '60ml',
            img: "/Rambaan_Tail.jpg",
            category: "First Aid",
            description: "Multi-purpose Ayurvedic healing oil known for its antiseptic properties. Effective for minor cuts, burns, and skin irritations.",
            howToUse: "Apply directly to affected area 2-3 times daily.",
            benefits: ["Faster healing of wounds.", "Soothes burns.", "Natural antiseptic.", "Relieves itching."],
            ingredients: "Neem Oil, Karanja Oil, Coconut Oil, Turmeric, Camphor, etc...",
        },
        {
            name: "Madhumeha Churna",
            price: 180.00,
            quantity: "70gm",
            img: "/Madhumeha_Churan.jpg",
            category: "Wellness",
            description: "Ayurvedic formulation designed to support healthy blood sugar levels. A blend of natural herbs traditionally used for managing Diabetes.",
            howToUse: "Take 1 teaspoon with water twice a day after meals.",
            benefits: ["Regulates blood sugar.", "Supports urinary health.", "Metabolic balance.", "Pure herbs."],
            ingredients: "Gudmar, Jamun, Ajwain, Lango, Karega Beg, Purasnava, Dudhini, etc...",
        },
        {
            name: "Sandhivatsal Churna",
            price: 210.00,
            quantity: "70gm",
            img: "/Sandhivatsal_Churna.jpeg",
            category: "Pain Relief",
            description: "Ayurvedic formulation specially designed to support joint and bone health. Helps relieve stiffness and swelling.",
            howToUse: "Take 1 teaspoon with warm water/milk twice a day after meals.",
            benefits: ["Relieves joint pain.", "Improves mobility.", "Supports bone health.", "Helps with arthritis."],
            ingredients: "Ashwagandha, Guggul, Dry Ginger, Rasna, Eranda Mool, Shallaki, Nirgundi, etc...",
        }
    ]

    for (const p of products) {
        await prisma.product.create({ data: p })
    }

    console.log('✅ Database seeded!')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })