-- Run this once in your Vercel Postgres query console
-- Dashboard → Storage → your DB → Query

CREATE TABLE IF NOT EXISTS jd_submissions (
  id              SERIAL PRIMARY KEY,
  token           TEXT NOT NULL UNIQUE,
  filename        TEXT NOT NULL,
  blob_url        TEXT NOT NULL,
  extracted_text  TEXT,
  score           INTEGER NOT NULL,
  summary         TEXT,
  matched_skills  JSONB DEFAULT '[]',
  gaps            JSONB DEFAULT '[]',
  ip_address      TEXT,
  user_agent      TEXT,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jd_submissions_submitted_at
  ON jd_submissions (submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_jd_submissions_token
  ON jd_submissions (token);