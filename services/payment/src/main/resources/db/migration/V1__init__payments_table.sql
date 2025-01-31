-- Active: 1737970247468@@127.0.0.1@5432@blog
-- CREATE
CREATE SEQUENCE IF NOT EXISTS payment_sequence increment by 50 start with 1;

-- CREATE
CREATE TABLE IF NOT EXISTS payment (
    id INTEGER NOT NULL DEFAULT nextval('payment_sequence') PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    payment_amount NUMERIC(19, 2),
    payment_method VARCHAR(255),
    payment_status VARCHAR(255) DEFAULT 'PENDING', 
    order_id VARCHAR(255) NOT NULL,
    razorpay_payment_id VARCHAR(255),
    payment_details TEXT,
    subscription_end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
