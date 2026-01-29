/*
  # Update Products Table Structure

  1. Modified Tables
    - `products` - Add new columns for detailed product information
    - `product_images` - New table for managing product images by S.No

  2. New Columns in Products Table
    - Pricing: name, mrp, discount, final_mrp, you_save, exclusive_reward
    - Images: product_image_1 through product_image_10
    - Details: size, material_composition, pattern, fit_type, sleeve_type, collar_style, length
    - Origin: country_of_origin, manufacturer, packer, importer
    - Specifications: item_weight, item_dimensions, net_quantity, generic_name
    - Description: about_this_item

  3. New Product Images Table
    - For managing image URLs by S.No reference

  4. Security
    - Maintain existing RLS policies
    - Add policies for product_images table
*/

-- First, let's add all the new columns to the existing products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS mrp decimal(10,2),
ADD COLUMN IF NOT EXISTS discount decimal(5,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS final_mrp decimal(10,2),
ADD COLUMN IF NOT EXISTS you_save decimal(10,2),
ADD COLUMN IF NOT EXISTS exclusive_reward text,
ADD COLUMN IF NOT EXISTS product_image_1 text,
ADD COLUMN IF NOT EXISTS product_image_2 text,
ADD COLUMN IF NOT EXISTS product_image_3 text,
ADD COLUMN IF NOT EXISTS product_image_4 text,
ADD COLUMN IF NOT EXISTS product_image_5 text,
ADD COLUMN IF NOT EXISTS product_image_6 text,
ADD COLUMN IF NOT EXISTS product_image_7 text,
ADD COLUMN IF NOT EXISTS product_image_8 text,
ADD COLUMN IF NOT EXISTS product_image_9 text,
ADD COLUMN IF NOT EXISTS product_image_10 text,
ADD COLUMN IF NOT EXISTS size text,
ADD COLUMN IF NOT EXISTS material_composition text,
ADD COLUMN IF NOT EXISTS pattern text,
ADD COLUMN IF NOT EXISTS fit_type text,
ADD COLUMN IF NOT EXISTS sleeve_type text,
ADD COLUMN IF NOT EXISTS collar_style text,
ADD COLUMN IF NOT EXISTS length text,
ADD COLUMN IF NOT EXISTS country_of_origin text,
ADD COLUMN IF NOT EXISTS about_this_item text,
ADD COLUMN IF NOT EXISTS manufacturer text,
ADD COLUMN IF NOT EXISTS packer text,
ADD COLUMN IF NOT EXISTS importer text,
ADD COLUMN IF NOT EXISTS item_weight text,
ADD COLUMN IF NOT EXISTS item_dimensions text,
ADD COLUMN IF NOT EXISTS net_quantity text,
ADD COLUMN IF NOT EXISTS generic_name text;

-- Create product_images table for managing images by S.No
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  s_no integer UNIQUE NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on product_images
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for product_images table
CREATE POLICY "Anyone can view active product images"
  ON product_images
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage product images"
  ON product_images
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_images_s_no ON product_images(s_no);
CREATE INDEX IF NOT EXISTS idx_product_images_active ON product_images(is_active);
CREATE INDEX IF NOT EXISTS idx_products_mrp ON products(mrp);
CREATE INDEX IF NOT EXISTS idx_products_final_mrp ON products(final_mrp);
CREATE INDEX IF NOT EXISTS idx_products_discount ON products(discount);

-- Create function to automatically calculate final_mrp and you_save
CREATE OR REPLACE FUNCTION calculate_product_pricing()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate final_mrp if mrp and discount are provided
  IF NEW.mrp IS NOT NULL AND NEW.discount IS NOT NULL THEN
    NEW.final_mrp = NEW.mrp - (NEW.mrp * NEW.discount / 100);
    NEW.you_save = NEW.mrp - NEW.final_mrp;
  END IF;
  
  -- Update the price column to match final_mrp for backward compatibility
  IF NEW.final_mrp IS NOT NULL THEN
    NEW.price = NEW.final_mrp;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically calculate pricing
CREATE TRIGGER calculate_product_pricing_trigger
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION calculate_product_pricing();

-- Create function to automatically update updated_at for product_images
CREATE TRIGGER update_product_images_updated_at
  BEFORE UPDATE ON product_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data to product_images table
INSERT INTO product_images (s_no, image_url, alt_text) VALUES
(1, 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg', 'Sample Product Image 1'),
(2, 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg', 'Sample Product Image 2'),
(3, 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 'Sample Product Image 3')
ON CONFLICT (s_no) DO NOTHING;