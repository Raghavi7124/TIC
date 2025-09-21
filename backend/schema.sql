-- Database schema for the Thunai MVP
-- This schema is designed for SQLite and matches the 9-column resources.csv file.

CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    type TEXT,
    language TEXT,
    service_mode TEXT,
    operating_hours TEXT,
    contact TEXT NOT NULL,
    description TEXT
);

-- Indexes are not necessary for the MVP with a small amount of data,
-- but can be added later if performance becomes an issue.
-- CREATE INDEX IF NOT EXISTS idx_city ON resources(city);
-- CREATE INDEX IF NOT EXISTS idx_language ON resources(language);