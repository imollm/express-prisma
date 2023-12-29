# API REST with ORM and MySQL

This is a simple REST API using the Repository design pattern to work with two database services MySQL and MongoDB.

Some features of this project are working with the new stable Node version 20.6.0

## 1. Init your database services

### 1.1 With Docker

Run a MySQL 8.0 service on port 3306 with root user and password 123456

```sh
docker run -p 3306:3306 -d --name mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:8.0
```

Run a MongoDB service on port 27017 with root user and password 123456

```sh
docker run -p 27017:27017 -d --name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=123456 \
mongo
```

## 2. Install Node dependencies

```sh
npm run install
```

## 3. Add to env file the connection url of databases

```sh
echo "API_PORT=4000
MYSQLDB_URI=\"mysql://root:123456@localhost:3306/moviesdb\"
MONGODB_URI=\"mongodb://root:123456@localhost:27017/\"" >> .env
```

## 4. Build the project

```sh
npm run build
```

## 4. Create a new MySQL database

```sh
npm run create:mysql:db
```

## 5. Seed Databases

```sh
npm run seed:mysql:db # for MySQL
npm run seed:mongo:db # for MongoDB
```

## 6. Build and run the API service in DEV mode

```sh
npm run start:dev
```
