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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at 
  ON survey_responses(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_survey_responses_email 
  ON survey_responses(email);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts (allow survey submissions)
CREATE POLICY "Allow anonymous inserts" 
  ON survey_responses 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy for authenticated reads (for admin dashboard)
CREATE POLICY "Allow authenticated reads" 
  ON survey_responses 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_survey_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_survey_updated_at_column();

-- Add comment to table
COMMENT ON TABLE survey_responses IS 'Stores survey responses about generator requirements';

