const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const sampleProducts = [
  {
    name: "Spicy Nachos",
    price: 120,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
    description: "Crispy nachos with a spicy kick perfect for race day excitement!",
    stock: 50
  },
  {
    name: "Energy Bars",
    price: 80,
    category: "Energy Bars",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "High-energy bars to fuel your F1 passion and keep you going.",
    stock: 75
  },
  {
    name: "Chocolate Cookies",
    price: 100,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    description: "Rich chocolate cookies that taste like victory on the podium.",
    stock: 60
  },
  {
    name: "Mixed Nuts",
    price: 150,
    category: "Nuts",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    description: "Premium mixed nuts for the ultimate racing fuel experience.",
    stock: 40
  },
  {
    name: "Fruit Juice",
    price: 60,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400",
    description: "Fresh fruit juice to keep you hydrated during intense race moments.",
    stock: 80
  },
  {
    name: "Protein Shake",
    price: 180,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400",
    description: "High-protein shake for post-race recovery and muscle building.",
    stock: 35
  },
  {
    name: "Granola Bars",
    price: 90,
    category: "Bars",
    image: "https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=400",
    description: "Crunchy granola bars packed with oats and honey goodness.",
    stock: 55
  },
  {
    name: "Popcorn",
    price: 70,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400",
    description: "Buttery popcorn perfect for watching F1 races at home.",
    stock: 90
  },
  {
    name: "Cheese Crackers",
    price: 85,
    category: "Crackers",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    description: "Crispy cheese crackers with a rich, savory flavor.",
    stock: 65
  },
  {
    name: "Trail Mix",
    price: 140,
    category: "Mix",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    description: "Perfect blend of nuts, dried fruits, and chocolate pieces.",
    stock: 45
  },
  {
    name: "Potato Chips",
    price: 95,
    category: "Chips",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    description: "Classic salted potato chips for the ultimate crunch.",
    stock: 70
  },
  {
    name: "Chocolate Bars",
    price: 110,
    category: "Chocolate",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
    description: "Rich milk chocolate bars for sweet racing moments.",
    stock: 55
  },
  {
    name: "Pretzels",
    price: 75,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    description: "Twisted pretzels with the perfect amount of salt.",
    stock: 80
  },
  {
    name: "Peanut Butter Cups",
    price: 125,
    category: "Candy",
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    description: "Creamy peanut butter wrapped in smooth chocolate.",
    stock: 40
  },
  {
    name: "Beef Jerky",
    price: 200,
    category: "Jerky",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400",
    description: "High-protein beef jerky for sustained energy.",
    stock: 30
  },
  {
    name: "Gummy Bears",
    price: 65,
    category: "Candy",
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    description: "Colorful gummy bears bursting with fruity flavors.",
    stock: 85
  },
  {
    name: "Rice Cakes",
    price: 55,
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    description: "Light and crispy rice cakes for guilt-free snacking.",
    stock: 60
  },
  {
    name: "Banana Chips",
    price: 90,
    category: "Chips",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    description: "Sweet and crunchy banana chips, naturally delicious.",
    stock: 50
  },
  {
    name: "Yogurt Cups",
    price: 45,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    description: "Creamy yogurt cups with fresh fruit flavors.",
    stock: 75
  },
  {
    name: "Muffins",
    price: 85,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
    description: "Freshly baked muffins with blueberries and chocolate chips.",
    stock: 35
  },
  {
    name: "Smoothie Bottles",
    price: 130,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400",
    description: "Fresh fruit smoothies packed with vitamins and energy.",
    stock: 40
  },
  {
    name: "Cereal Bars",
    price: 70,
    category: "Bars",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "Crunchy cereal bars with honey and oats.",
    stock: 65
  },
  {
    name: "Dried Fruits",
    price: 160,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400",
    description: "Mix of dried apricots, dates, and raisins.",
    stock: 45
  },
  {
    name: "Sandwich Wraps",
    price: 180,
    category: "Wraps",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    description: "Fresh wraps with chicken, vegetables, and sauce.",
    stock: 25
  },
  {
    name: "Ice Cream Cups",
    price: 95,
    category: "Frozen",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    description: "Creamy ice cream cups in vanilla and chocolate flavors.",
    stock: 50
  },
  {
    name: "Energy Drinks",
    price: 120,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=400",
    description: "High-caffeine energy drinks for maximum performance.",
    stock: 60
  },
  {
    name: "Cookies & Cream",
    price: 105,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    description: "Classic cookies and cream combination snack.",
    stock: 55
  },
  {
    name: "Veggie Chips",
    price: 110,
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    description: "Baked vegetable chips made from sweet potatoes and beets.",
    stock: 40
  },
  {
    name: "Iced Coffee",
    price: 85,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    description: "Cold brew iced coffee for the perfect caffeine boost.",
    stock: 70
  },
  {
    name: "Candy Mix",
    price: 80,
    category: "Candy",
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    description: "Assorted candy mix with chocolates, gummies, and hard candies.",
    stock: 90
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Sample products added successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();
