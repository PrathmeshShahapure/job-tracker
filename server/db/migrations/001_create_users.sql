create table users(
    id serial primary key,
    email varchar(50) unique,
    password_hash varchar(100),
    create_at timestamp default current_timestamp
);