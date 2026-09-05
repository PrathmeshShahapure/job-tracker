create table applications(
 
   id serial primary key,
   user_id integer references users(id) on delete cascade,
   company_name VARCHAR(100) NOT NULL,
   job_title VARCHAR(100) NOT NULL,
   location VARCHAR(100),
   status varchar(20) not null check (status in ('Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn')),
   applied_at timestamp,
   notes text,
   created_at timestamp default current_timestamp
);