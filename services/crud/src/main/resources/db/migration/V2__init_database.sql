-- CREATE
create table if not exists category (
    id integer not null primary key,
    name varchar not null,
    description varchar not null
);

-- CREATE
create table if not exists blog (
    id integer not null primary key,
    title varchar(100) not null,
    author varchar,
    content text not null,
    category_id integer constraint foreign_key_constraint references category,
    created_at timestamp,
    last_modified_at timestamp
);

-- CREATE
create sequence if not exists category_sequence increment by 50 start with 1;
create sequence if not exists blog_sequence increment by 50 start with 1;