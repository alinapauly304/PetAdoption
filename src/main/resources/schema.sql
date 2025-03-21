DROP DATABASE IF EXISTS petadoption;
CREATE DATABASE petadoption;
USE petadoption;

CREATE TABLE shelters (
    shelter_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE adopters (
    adopter_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE pets (
    pet_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    shelter_id BIGINT NOT NULL,
    FOREIGN KEY (shelter_id) REFERENCES shelters(shelter_id)
);

CREATE TABLE adoption_requests (
    request_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    adopter_id BIGINT NOT NULL,
    message TEXT,
    status VARCHAR(20) NOT NULL,
    response TEXT,
    request_date TIMESTAMP NOT NULL,
    response_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(pet_id),
    FOREIGN KEY (adopter_id) REFERENCES adopters(adopter_id)
); 