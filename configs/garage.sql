CREATE DATABASE IF NOT EXISTS  garage_db;

USE garage_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (lastname, firstname, email, password, role) VALUES ('VroumVroum', 'Garagiste', 'garagiste@vroumvroum.fr', '$2a$08$K1WDAEAfMUsXmYGQJffEXuA47ZBqAQdxglvZW2MPFvpY/zbAvwqZO', 'admin');
INSERT INTO users (lastname, firstname, email, password, role) VALUES ('Elric', 'Edward', 'edward.elric@alchem.fma', '$2a$08$K1WDAEAfMUsXmYGQJffEXuA47ZBqAQdxglvZW2MPFvpY/zbAvwqZO', 'client'); 


CREATE TABLE IF NOT EXISTS vehicules (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    marque VARCHAR(50) NOT NULL,
    modele VARCHAR(50) NOT NULL,
    annee INT(11),
    client_id INT(11),
    FOREIGN KEY (client_id) REFERENCES users(id)
);

INSERT INTO vehicules (marque, modele, annee, client_id) VALUES ('Renaut', 'Clio', 2020, 1);
