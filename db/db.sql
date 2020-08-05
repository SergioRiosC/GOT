create database if not exists company;

use company;

create table employees (
	id int(11) not null auto_increment,
    name varchar(45) default null,
    salary int(11) default null,
    primary key(id)
);

insert into employees values
	(1,'Ryan Ray',200000),    
	(2,'Joe McMilan',400000), 
	(3,'John Carter',500000);


describe employees;

select * from employees;