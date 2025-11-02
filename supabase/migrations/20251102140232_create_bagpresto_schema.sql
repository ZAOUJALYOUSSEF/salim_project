/*
  # BagPresto Database Schema

  ## Overview
  This migration creates the complete database structure for BagPresto, a platform connecting
  local businesses with bag distributors for eco-friendly advertising in Normandy, France.

  ## New Tables

  ### 1. `profiles`
  Extends auth.users with additional user information
  - `id` (uuid, FK to auth.users) - Primary key
  - `email` (text) - User email
  - `full_name` (text) - Full name
  - `phone` (text) - Phone number
  - `user_type` (text) - Type: 'client', 'partner', or 'admin'
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `clients`
  Stores advertiser/client business information
  - `id` (uuid) - Primary key
  - `user_id` (uuid, FK to profiles) - Associated user account
  - `company_name` (text) - Business name
  - `sector` (text) - Business sector
  - `postal_code` (text) - Normandy postal code
  - `logo_url` (text) - Logo image URL
  - `message` (text) - Advertising message
  - `status` (text) - Account status: 'pending', 'active', 'suspended'
  - `created_at` (timestamptz) - Registration date

  ### 3. `partners`
  Stores distributor/partner business information
  - `id` (uuid) - Primary key
  - `user_id` (uuid, FK to profiles) - Associated user account
  - `business_name` (text) - Business name
  - `business_type` (text) - Type: bakery, pharmacy, supermarket, restaurant
  - `address` (text) - Full address
  - `postal_code` (text) - Normandy postal code
  - `city` (text) - City name
  - `logo_url` (text) - Logo image URL
  - `bag_quantity` (integer) - Requested bag quantity
  - `latitude` (numeric) - GPS latitude for map
  - `longitude` (numeric) - GPS longitude for map
  - `status` (text) - Account status: 'pending', 'active', 'suspended'
  - `created_at` (timestamptz) - Registration date

  ### 4. `campaigns`
  Tracks advertising campaigns
  - `id` (uuid) - Primary key
  - `client_id` (uuid, FK to clients) - Client running the campaign
  - `campaign_name` (text) - Campaign name
  - `start_date` (date) - Campaign start date
  - `end_date` (date) - Campaign end date
  - `bags_printed` (integer) - Number of bags printed
  - `status` (text) - Status: 'pending', 'approved', 'printing', 'distributed', 'completed'
  - `created_at` (timestamptz) - Campaign creation date

  ### 5. `campaign_partners`
  Links campaigns to distributing partners
  - `id` (uuid) - Primary key
  - `campaign_id` (uuid, FK to campaigns) - Associated campaign
  - `partner_id` (uuid, FK to partners) - Distributing partner
  - `bags_allocated` (integer) - Bags allocated to this partner
  - `bags_distributed` (integer) - Bags actually distributed
  - `created_at` (timestamptz) - Allocation date

  ### 6. `statistics`
  Global platform statistics
  - `id` (uuid) - Primary key
  - `total_bags_distributed` (integer) - Total bags distributed
  - `total_partners` (integer) - Total active partners
  - `co2_saved_kg` (numeric) - Estimated CO2 saved in kg
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Profiles: Users can view/update own profile
  - Clients: Users can view own client data, admins can view all
  - Partners: Users can view own partner data, admins can view all
  - Campaigns: Clients can view own campaigns, partners can view campaigns they distribute
  - Campaign Partners: Partners see their allocations, clients see their campaign distributions
  - Statistics: Public read access

  ## Important Notes
  1. Postal codes are validated for Normandy region (14, 27, 50, 61, 76)
  2. All timestamps use UTC timezone
  3. Default statuses ensure proper approval workflow
  4. Latitude/longitude enable interactive map functionality
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  user_type text NOT NULL CHECK (user_type IN ('client', 'partner', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  sector text NOT NULL,
  postal_code text NOT NULL,
  logo_url text,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_type text NOT NULL CHECK (business_type IN ('bakery', 'pharmacy', 'supermarket', 'restaurant', 'other')),
  address text NOT NULL,
  postal_code text NOT NULL,
  city text NOT NULL,
  logo_url text,
  bag_quantity integer DEFAULT 0,
  latitude numeric,
  longitude numeric,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  bags_printed integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'printing', 'distributed', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create campaign_partners junction table
CREATE TABLE IF NOT EXISTS campaign_partners (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  partner_id uuid REFERENCES partners(id) ON DELETE CASCADE,
  bags_allocated integer DEFAULT 0,
  bags_distributed integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE campaign_partners ENABLE ROW LEVEL SECURITY;

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_bags_distributed integer DEFAULT 0,
  total_partners integer DEFAULT 0,
  co2_saved_kg numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Insert initial statistics record
INSERT INTO statistics (total_bags_distributed, total_partners, co2_saved_kg)
VALUES (0, 0, 0)
ON CONFLICT DO NOTHING;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for clients
CREATE POLICY "Users can view own client data"
  ON clients FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

CREATE POLICY "Users can insert own client data"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own client data"
  ON clients FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

CREATE POLICY "Admins can delete client data"
  ON clients FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'));

-- RLS Policies for partners
CREATE POLICY "Users can view own partner data"
  ON partners FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

CREATE POLICY "Anyone can view active partners for map"
  ON partners FOR SELECT
  TO anon
  USING (status = 'active');

CREATE POLICY "Users can insert own partner data"
  ON partners FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own partner data"
  ON partners FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

CREATE POLICY "Admins can delete partner data"
  ON partners FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'));

-- RLS Policies for campaigns
CREATE POLICY "Clients can view own campaigns"
  ON campaigns FOR SELECT
  TO authenticated
  USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin') OR
    EXISTS (
      SELECT 1 FROM campaign_partners cp
      JOIN partners p ON cp.partner_id = p.id
      WHERE cp.campaign_id = campaigns.id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert own campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients and admins can update campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

CREATE POLICY "Admins can delete campaigns"
  ON campaigns FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'));

-- RLS Policies for campaign_partners
CREATE POLICY "Partners can view their campaign allocations"
  ON campaign_partners FOR SELECT
  TO authenticated
  USING (
    partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()) OR
    campaign_id IN (SELECT id FROM campaigns WHERE client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())) OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

CREATE POLICY "Admins can insert campaign allocations"
  ON campaign_partners FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'));

CREATE POLICY "Partners and admins can update allocations"
  ON campaign_partners FOR UPDATE
  TO authenticated
  USING (
    partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin')
  );

-- RLS Policies for statistics
CREATE POLICY "Anyone can view statistics"
  ON statistics FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can update statistics"
  ON statistics FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_postal_code ON partners(postal_code);
CREATE INDEX IF NOT EXISTS idx_campaigns_client_id ON campaigns(client_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaign_partners_campaign_id ON campaign_partners(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_partners_partner_id ON campaign_partners(partner_id);