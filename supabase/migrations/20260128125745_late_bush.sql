/*
  # Customer Complaints System

  1. New Tables
    - `customer_complaints`
      - `id` (uuid, primary key)
      - `name` (text, customer name)
      - `email` (text, customer email)
      - `phone` (text, optional phone number)
      - `subject` (text, complaint subject)
      - `message` (text, detailed complaint message)
      - `category` (text, complaint category)
      - `priority` (text, priority level)
      - `status` (text, current status)
      - `assigned_to` (text, staff member assigned)
      - `resolution_notes` (text, resolution details)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `resolved_at` (timestamp, when resolved)

  2. Security
    - Enable RLS on `customer_complaints` table
    - Add policies for public submission and admin access

  3. Indexes
    - Add indexes for common queries
*/

-- Create customer_complaints table
CREATE TABLE IF NOT EXISTS customer_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  assigned_to text,
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  
  -- Constraints
  CONSTRAINT valid_category CHECK (category IN ('general', 'billing', 'shipping', 'product', 'technical', 'refund', 'other')),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  CONSTRAINT valid_status CHECK (status IN ('open', 'in_progress', 'resolved', 'closed'))
);

-- Enable Row Level Security
ALTER TABLE customer_complaints ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert complaints
CREATE POLICY "Anyone can submit complaints"
  ON customer_complaints
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for authenticated users to view their own complaints
CREATE POLICY "Users can view their own complaints"
  ON customer_complaints
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Create policy for admins to view all complaints (you'll need to set up admin roles)
CREATE POLICY "Admins can view all complaints"
  ON customer_complaints
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data ->> 'role' = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customer_complaints_email ON customer_complaints(email);
CREATE INDEX IF NOT EXISTS idx_customer_complaints_status ON customer_complaints(status);
CREATE INDEX IF NOT EXISTS idx_customer_complaints_category ON customer_complaints(category);
CREATE INDEX IF NOT EXISTS idx_customer_complaints_priority ON customer_complaints(priority);
CREATE INDEX IF NOT EXISTS idx_customer_complaints_created_at ON customer_complaints(created_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_customer_complaints_updated_at
  BEFORE UPDATE ON customer_complaints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to set resolved_at when status changes to resolved
CREATE OR REPLACE FUNCTION set_resolved_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'resolved' AND OLD.status != 'resolved' THEN
    NEW.resolved_at = now();
  ELSIF NEW.status != 'resolved' THEN
    NEW.resolved_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to set resolved_at
CREATE TRIGGER set_customer_complaints_resolved_at
  BEFORE UPDATE ON customer_complaints
  FOR EACH ROW
  EXECUTE FUNCTION set_resolved_at();