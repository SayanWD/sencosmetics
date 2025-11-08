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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts (allow form submissions)
CREATE POLICY "Allow anonymous inserts" 
  ON contact_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy for authenticated reads (for admin dashboard)
CREATE POLICY "Allow authenticated reads" 
  ON contact_submissions 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the landing page';

-- Create newsletter_subscribers table (Phase 1: landing subscriptions)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  subscribed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status 
  ON newsletter_subscribers(status);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts on newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated reads on newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "Allow anonymous inserts on newsletter_subscribers" 
  ON newsletter_subscribers 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on newsletter_subscribers" 
  ON newsletter_subscribers 
  FOR SELECT 
  TO authenticated 
  USING (true);

COMMENT ON TABLE newsletter_subscribers IS 'Landing newsletter subscriptions with double opt-in workflow';

