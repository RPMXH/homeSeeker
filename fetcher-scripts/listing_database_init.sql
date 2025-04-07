-- init.sql
-- Create the database and tables (if they don't exist)
CREATE DATABASE IF NOT EXISTS listing_database;

GRANT ALL PRIVILEGES ON listing_database.* TO 'user'@'%';

CREATE TABLE IF NOT EXISTS listing_database.listings (
    listing_id VARCHAR(255) PRIMARY KEY,
    assessment CHAR(1),
    notes TEXT,
    source TEXT,
    price DECIMAL(10, 2),
    listing_link VARCHAR(255)
);