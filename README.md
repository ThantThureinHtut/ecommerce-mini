# Ecommerce Mini

`Ecommerce Mini` is a learning-focused full-stack ecommerce project built with Laravel, Inertia.js, React, and TypeScript. It was created as a practical way to improve database design skills, understand SQL joins and relationships more deeply, and get hands-on experience building a slightly more complex system than a basic CRUD app.

This project was especially focused on learning how relational data works in real applications, including one-to-many and many-to-many relationships, order flows, variant handling, seller features, and data transformation across the backend and frontend.

## Project Purpose

The main goal of this project was to practice:

- Writing and understanding SQL-style queries through Laravel Eloquent
- Designing and working with relational tables
- Handling `one-to-many` and `many-to-many` relationships
- Managing more complex data flows in an ecommerce-style application
- Learning why certain patterns and best practices are used, not just copying code

This project was challenging because it was one of the first times working closely with a more complex database structure. It became a practical way to understand how relations are modeled, queried, and rendered in a real application.

AI was used as a learning assistant during development, mainly to:

- explain best practices
- clarify why a pattern should be used
- show how Laravel and database relationships work
- support learning instead of only generating code to paste

## What I Learned

This project helped strengthen my understanding of:

- Laravel collections
- Eloquent relationship querying
- `whereHas`, `when`, and `transform`
- using raw SQL concepts inside Laravel when needed
- mail delivery in Laravel
- building with TypeScript more comfortably
- handling product variants and relational data mapping
- thinking more carefully about database design before writing code

Although I am still improving, this project made TypeScript feel much more approachable and helped me become more confident working with backend-to-frontend data structures.

## Features

Current project features include:

- product listing and item detail pages
- seller product creation flow
- product variants and variant value selection
- cart management
- checkout and order creation
- shipping address handling
- order tracking for customers
- seller order management views
- product reviews and ratings
- email sending for order-related flows
- authentication for users and sellers

## Tech Stack

### Backend

- PHP 8.2+
- Laravel 11
- Inertia.js (Laravel adapter)
- Eloquent ORM
- Laravel Mail
- Laravel Socialite

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Inertia.js React
- Phosphor Icons

### Testing and Tooling

- Pest
- PHPUnit
- Laravel Pint

## Architecture Notes

This project explores working with relational ecommerce data such as:

- users and sellers
- products and product images
- product types, values, and variants
- carts and cart items
- orders and order variants
- reviews and ratings

The application relies heavily on Eloquent relationships and collection transformations to shape backend data for frontend rendering.

## Why This Project Matters To Me

This project represents an important step in learning how real application data is connected. The biggest value was not just building screens, but understanding:

- how relationships connect across tables
- how to query related data correctly
- how to avoid treating the database like flat data
- how frontend pages depend on clean backend data structures

It also helped shift my mindset from “just make it work” to “understand why it works.”

## Local Development

### Requirements

- PHP 8.2 or newer
- Composer
- Node.js and npm
- MySQL or another supported database

### Setup

1. Clone the repository.
2. Install PHP dependencies:

```bash
composer install
```

3. Install frontend dependencies:

```bash
npm install
```

4. Create your environment file:

```bash
cp .env.example .env
```

5. Generate the app key:

```bash
php artisan key:generate
```

6. Configure your database in `.env`.
7. Run migrations:

```bash
php artisan migrate
```

8. Start the development environment:

```bash
composer run dev
```

## Build

To build the frontend assets:

```bash
npm run build
```

## Testing

To run the test suite:

```bash
php artisan test
```

## Future Improvements

Possible next steps for this project:

- improve database normalization where needed
- add stronger validation and edge-case handling
- expand seller management tools
- add payment method support
- improve test coverage
- refine UI consistency across pages
- optimize query performance for larger datasets

## Summary

`Ecommerce Mini` is more than a practice app. It is a hands-on learning project focused on understanding relational databases, Laravel ORM patterns, and full-stack data flow. It reflects real progress in SQL thinking, Laravel collections, mail handling, and TypeScript confidence.

This project helped build stronger fundamentals by learning how and why things work, not only how to produce the final output.
