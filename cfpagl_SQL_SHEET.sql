create database CFPAGL;
use CFPAGL;

create table Speciality (
    -- routes and controllers done
speciality_id varchar(15) primary key not null,
speciality varchar(50) not null,
training_duration int not null,
training_type varchar(25)
);

create table Branch (
    -- routes and controllers done
branch_id varchar(15) primary key not null,
training_start_date date not null,
training_end_date date not null,
speciality_id varchar(15),
foreign key (speciality_id) references Speciality 
(speciality_id)
);

create table Student (
student_id int(10) primary key,
first_name varchar(25) not null,
last_name varchar(25) not null,
birth_date date not null,
phone_number varchar(15),
sex varchar(10) not null,
branch_id varchar(15),
foreign key (branch_id) references Branch 
(branch_id)
);

create table Author (
author_id int primary key auto_increment,
author_name varchar(60) not null, 
nationality varchar(30)
);

create table Categories (
categorie_id int primary key auto_increment not null,
categorie_name varchar(50) not null 
);

create table publishing_house (
publishing_house_id int primary key auto_increment not null,
publishing_house_name varchar(100) not null 
);

create table punishment (
punishment_id int primary key auto_increment not null,
cause varchar(100) not null,
duration int not null
);

create table books (
book_id varchar(25) primary key not null,
book_title varchar(200) not null,
summary varchar(255),
total_pages int,
publishing_year int,
stored_date timestamp default current_timestamp,
cover varchar(250),
categorie_id int not null,
publishing_house_id int not null,
foreign key (categorie_id) references Categories 
(categorie_id),
foreign key (publishing_house_id) references publishing_house 
(publishing_house_id)
);

create table book_copys (
copy_id varchar(25) primary key not null,
inventory_number int not null,
location varchar(5),
book_id varchar(25) not null,
foreign key (book_id) references Books
(book_id)
);

CREATE TABLE book_authors (
    author_id INT NOT NULL,
    book_id VARCHAR(25) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Author (author_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id),
    PRIMARY KEY (author_id, book_id)
);

create table indexs ( 
    -- book_id been made a primary key too in a later edit
index_id varchar(20) primary key not null,
index_picture varchar(250),
book_id varchar(25) not null,
foreign key (book_id) references Books
(book_id)
);

create table managers (
manager_id int primary key auto_increment not null,
username varchar (25) not null,
passkey varchar (50) not null,
first_name varchar (25) not null,
last_name varchar (25) not null,
sex varchar(10) not null,
email varchar(50)
);

create table loans (
loan_id int primary key auto_increment not null,
loan_start_date timestamp default current_timestamp not null,
loan_end_date date,
note varchar (50),
student_id int not null,
manager_id int not null,
copy_id varchar(25) not null,
foreign key (student_id) references Student 
(student_id),
foreign key (manager_id) references managers 
(manager_id),
foreign key (copy_id) references book_copys
(copy_id)
);

create table readers (
read_session int primary key auto_increment not null,
entry_time timestamp default current_timestamp not null,
exit_time timestamp,
student_id int not null,
manager_id int not null,
copy_id varchar(25) not null,
foreign key (student_id) references Student 
(student_id),
foreign key (manager_id) references managers 
(manager_id),
foreign key (copy_id) references book_copys
(copy_id)
);

create table penalty_record (
penalty_id int primary key auto_increment not null,
penalty_start_date timestamp default current_timestamp not null,
loan_id int not null,
punishment_id int not null,
foreign key (loan_id) references loans
(loan_id),
foreign key (punishment_id) references punishment
(punishment_id)
);