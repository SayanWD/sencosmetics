-- ====================================================
-- SUPABASE DATABASE INITIALIZATION SCRIPT
-- ====================================================
-- This script creates all necessary tables, indexes,
-- policies, and triggers for the Sencosmetics landing page
-- ====================================================

-- ====================================================
-- 1. CONTACT SUBMISSIONS TABLE
-- ====================================================

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

-- Add comment to table
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the landing page';

-- ====================================================
-- 2. SURVEY RESPONSES TABLE (Landing questionnaire)
-- ====================================================

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question1 TEXT NOT NULL,
  question2 TEXT NOT NULL,
  question3 TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at 
  ON survey_responses(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_survey_responses_email 
  ON survey_responses(email);

-- Add comment to table
COMMENT ON TABLE survey_responses IS 'Stores landing survey responses (Phase 1)';

-- ====================================================
-- 3. NEWSLETTER SUBSCRIBERS TABLE (double opt-in ready)
-- ====================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | subscribed | unsubscribed
  subscribed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status
  ON newsletter_subscribers(status);

COMMENT ON TABLE newsletter_subscribers IS 'Landing newsletter subscriptions with double opt-in workflow';

-- ====================================================
-- 3. FUNCTIONS
-- ====================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ====================================================
-- 4. TRIGGERS
-- ====================================================

-- Create trigger for contact_submissions
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for survey_responses
CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ====================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ====================================================

-- Enable Row Level Security on contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Allow anonymous inserts on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads on contact_submissions" ON contact_submissions;

-- Create policy for anonymous inserts (contact form)
CREATE POLICY "Allow anonymous inserts on contact_submissions" 
  ON contact_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy for authenticated reads (admin dashboard)
CREATE POLICY "Allow authenticated reads on contact_submissions" 
  ON contact_submissions 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Enable Row Level Security on survey_responses
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Allow anonymous inserts on survey_responses" ON survey_responses;
DROP POLICY IF EXISTS "Allow authenticated reads on survey_responses" ON survey_responses;

-- Create policy for anonymous inserts (survey form)
CREATE POLICY "Allow anonymous inserts on survey_responses" 
  ON survey_responses 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy for authenticated reads (admin dashboard)
CREATE POLICY "Allow authenticated reads on survey_responses" 
  ON survey_responses 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Enable RLS for newsletter_subscribers
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts on re-run
DROP POLICY IF EXISTS "Allow anonymous inserts on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated reads on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow owner unsubscribe on newsletter_subscribers" ON newsletter_subscribers;

-- Allow anonymous subscribe (insert)
CREATE POLICY "Allow anonymous inserts on newsletter_subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated reads for backoffice
CREATE POLICY "Allow authenticated reads on newsletter_subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- ====================================================
-- 6. VERIFICATION
-- ====================================================

-- Display success message
DO $$
BEGIN
  RAISE NOTICE '✅ Database initialization completed successfully!';
  RAISE NOTICE '📊 Tables created: contact_submissions, survey_responses';
  RAISE NOTICE '🔐 Row Level Security enabled';
  RAISE NOTICE '📝 Triggers configured';
  RAISE NOTICE '🔍 Indexes created';
END $$;
