# Sequelize Phone Practice

A training project for practicing PostgreSQL and Sequelize ORM.

## Features

- Database creation using Sequelize CLI
- Phone model creation
- Database migration
- Data validation
- CRUD operations
- Pagination
- Sorting
- Filtering
- Aggregate functions
- Grouping with `GROUP BY`
- Filtering grouped data with `HAVING`

## Technologies

- Node.js
- PostgreSQL
- Sequelize ORM
- Sequelize CLI

## Installation

Install dependencies:

```bash
npm install
```

## Database Configuration

Configure your PostgreSQL connection in:

```text
config/config.json
```

Example:

```json
{
  "development": {
    "username": "postgres",
    "password": "your_password",
    "database": "phones_sequelize_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

## Create Database

```bash
npx sequelize db:create
```

## Run Migrations

```bash
npx sequelize db:migrate
```

## Generate Phone Model

```bash
npx sequelize model:generate --name Phone --attributes model:string,brand:string,productionYear:integer,ramSize:integer,processor:string,screenDiagonal:float,hasNfc:boolean
```

## Run the Project

```bash
npm run dev
```

or

```bash
npm start
```

## Phone Model

| Field | Type |
|------|------|
| id | Integer |
| model | String |
| brand | String |
| productionYear | Integer |
| ramSize | Integer |
| processor | String |
| screenDiagonal | Float |
| hasNfc | Boolean |
| createdAt | Date |
| updatedAt | Date |

## Implemented Queries

- Create a new phone
- Get the third page of phones (4 phones per page)
- Sort phones by production year
- Get phones released in the current year
- Get phones released before 2023
- Update RAM size for the phone with `id = 1`
- Enable NFC for all phones released in 2024
- Delete the phone with `id = 2`
- Delete all phones released in 2016
- Calculate the average RAM size
- Count phones by brand
- Get brands whose maximum screen diagonal is greater than **6.6 inches**

## Project Structure

```text
config/
migrations/
models/
seeders/
src/
  queries/
    phoneQueries.js
  index.js
```

## CLI Command

The Sequelize CLI command used to generate the model is also included in the project:

```text
sequelize-cli.txt
```

