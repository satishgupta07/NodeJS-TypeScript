# Conduit (Medium Clone based on realworld.io)

## Technologies Used

1. NodeJS - Platform
2. TypeScript - Programming Language
3. MySQL - Database 
4. TypeORM - ORM

## Database Setup

```mysql
create database conduit;
use conduit;
create user conduit identified by 'conduit';
grant all privileges on conduit.* to conduit;
flush privileges;
```