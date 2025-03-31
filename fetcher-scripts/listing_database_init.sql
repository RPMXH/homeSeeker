-- init.sql
-- Create the database and tables (if they don't exist)
CREATE DATABASE IF NOT EXISTS listing_database;
USE listing_database;

CREATE TABLE IF NOT EXISTS listings (
    listing_id VARCHAR(255) PRIMARY KEY,
    assessment CHAR(1),
    notes TEXT,
    source TEXT,
    price DECIMAL(10, 2),
    listing_link VARCHAR(255)
);