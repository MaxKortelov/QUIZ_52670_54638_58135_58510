CREATE TABLE feedbacks (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    surname VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL,
    phone_number VARCHAR(500) NOT NULL,
    rate INT NOT NULL,
    headline VARCHAR(500) NOT NULL,
    text VARCHAR(500) NOT NULL
);