-- Seats table
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT
);

-- Add user reference
ALTER TABLE seats ADD COLUMN user_id INT;

INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);