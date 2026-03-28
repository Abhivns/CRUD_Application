CREATE TABLE auth_user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE TABLE teachers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL UNIQUE,
    university_name VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    year_joined INT NOT NULL,
    department VARCHAR(150) NULL,
    phone_number VARCHAR(20) NULL,
    CONSTRAINT fk_teachers_user
        FOREIGN KEY (user_id) REFERENCES auth_user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
