DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
)