-- =============================================
-- Aureum Luxury Database Setup
-- MySQL Workbench ya terminal mein run karo
-- =============================================

-- Database banao
CREATE DATABASE IF NOT EXISTS aureum_db;
USE aureum_db;

-- Products table banao
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500),
    category VARCHAR(50),
    sub_category VARCHAR(50),
    rating DECIMAL(3, 1),
    featured BOOLEAN DEFAULT FALSE,
    options_label VARCHAR(100),
    options TEXT,
    full_description TEXT
);

-- Saara data insert karo (aureum ke 8 products)
INSERT IGNORE INTO products VALUES
(
    'prod-1',
    'Aureum Savile Bespoke Tuxedo',
    'Handcrafted Savile Row midnight black wool-cashmere tuxedo with silk-satin peak lapels and 24k gold-thread pinstripes.',
    4800.00,
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800',
    'Suits',
    'Evening Wear',
    5.0,
    TRUE,
    'Fitted Size',
    '38R (Slim),40R (Regular),42R (Regular),42L (Athletic),44R (Bespoke)',
    'Designed for the modern connoisseur, this bespoke tuxedo is meticulously sculpted from premium super-150s midnight black wool blended with fine Himalayan cashmere.'
),
(
    'prod-2',
    'The Gilded Legacy Chronograph',
    'An exceptional masterpiece timepiece of 18k solid yellow gold casing, skeletonized tourbillon, and obsidian black dial.',
    32000.00,
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800',
    'Watches',
    'Complications',
    4.9,
    TRUE,
    'Bracelet Type',
    'Solid 18K Yellow Gold (Integrated),Obsidian Matte Alligator,Hand-Finished Black Oysterflex',
    'The absolute pinnacle of watchmaking craftsmanship. Housing our bespoke mechanical caliber, the Aureum Tourbillon features a visible manual-wind escapement.'
),
(
    'prod-3',
    'Obsidian Velvet Bespoke Blazer',
    'An elegant, heavyweight plush Italian velvet double-breasted blazer with signature custom polished-brass military buttons.',
    3400.00,
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    'Suits',
    'Separates',
    4.8,
    TRUE,
    'Chest Size',
    '38 Slim,40 Regular,42 Regular,44 Tall',
    'Inspired by old-world Milanese salons, this heavy velvet blazer is crafted from exceptional Italian velvet.'
),
(
    'prod-4',
    'Grand Tourer Black Calfskin Weekender',
    'Prestige matte calfskin travel bag handcrafted with premium hand-painted gold edges and robust 24k gilded solid brass hardware.',
    2450.00,
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    'Leather',
    'Luggage',
    4.9,
    TRUE,
    'Hardware Trim',
    'Polished 24K Gold Hardware,Midnight Black Matte Chrome,Brushed Rose Gold Hardware',
    'The ultimate travel companion for private journeys. Hand-sculpted in Florence from a single hide of first-selection Tuscan matte calf leather.'
),
(
    'prod-5',
    'Sovereign Gold-Bar Loafers',
    'Finest hand-lasted box-calf leather dress loafers, decorated with an elegant 18k gold-finished minimalist logo saddle bar.',
    1350.00,
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
    'Leather',
    'Footwear',
    5.0,
    FALSE,
    'US Shoe Size',
    '8 D(M),9 D(M),10 D(M),11 D(M),12 D(M)',
    'Constructed with a traditional Goodyear welt on a custom elongated last, these sleek loafers seamlessly bridge classic dapper design with contemporary luxury.'
),
(
    'prod-6',
    'Aureum Classic Amber Noir Parfum',
    'A highly concentrated, enigmatic signature fragrance of absolute rare oud, charred amber wood, dark cocoa, and gold saffron.',
    420.00,
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    'Accessories',
    'Fragrance',
    4.8,
    FALSE,
    'Concentration Size',
    '100ml (Extrait de Parfum),150ml Decanter + Hand Atomizer,50ml Travel Flacon',
    'Whispering untold secrets of exotic spice and warm embers, Amber Noir is the ultimate olfactory statement.'
),
(
    'prod-7',
    'Gilded Aviator Titanium Shades',
    'Japanese lightweight titanium gold-plated aviator sunglasses, featuring precious deep obsidian polarized mineral lenses.',
    850.00,
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    'Accessories',
    'Eyewear',
    4.7,
    FALSE,
    'Frame Variant',
    '18K Yellow Gold & Matte Black,18K Rose Gold & Havanna Acetate,White Gold & Slate Grey-Polarized',
    'A glorious reinterpretation of the iconic aviator. Engineered in Fukui, Japan from grade-5 titanium, then dipped in an 18k yellow gold flash bath.'
),
(
    'prod-8',
    'Empress Silk Scarf & Cufflinks Set',
    'A premium set composed of a pure mulberry hand-rolled gold paisley print silk pocket square and matching solid initial cufflinks.',
    680.00,
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
    'Accessories',
    'Formal Accents',
    4.9,
    FALSE,
    'Monogram engraving',
    'None (Standard),Insignia Engraving (Free),Bespoke Royal Monogram (Allow 5 days)',
    'Elevate your formal dressing to regal heights. The scarf is hand-woven in Lake Como from 100% thick mulberry silk.'
);

-- Verify karo
SELECT id, name, category, price FROM products;
