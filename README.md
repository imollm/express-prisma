# API REST with ORM and MySQL

## Init your database service

### With Docker
Run a MySQL 8.0 service on port 3306 with root user and password 123456

```sh
docker run -p 3306:3306 -d --name mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0
```

## Install Node dependencies

```sh
npm run install
```

## Create an .env file in the root

```sh
touch .env
```

### Add to env file the connection url of database

```sh
echo "API_PORT=4000\n
DATABASE_URL=\"mysql://root:123456@localhost:3306/moviesdb\""
```

## Seed Database

```sh
npm run seed:db
```

## Build and run the API service in DEV mode

```sh
npm run start:dev
```
