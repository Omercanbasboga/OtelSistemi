# OtelSistemi

A hotel booking and management web app built with Express, EJS, and MongoDB. Guests can browse rooms and make reservations on the public site; an admin panel handles rooms, staff, and reservation management behind JWT-based authentication.

## Features

- **Public site** — room listings, room detail pages, and a reservation flow for guests
- **Admin panel** — manage rooms, staff (`person`), and reservations from a separate `/admin` area
- **Authentication** — JWT-based login via Passport (local strategy), with cookie-backed sessions
- **Image uploads** — room/gallery images uploaded via `express-fileupload` and stored on Cloudinary
- **Email notifications** — reservation confirmations sent with Nodemailer
- **Server-rendered UI** — EJS templates, no separate frontend build step

## Tech stack

Node.js, Express 4, EJS, MongoDB + Mongoose, Passport (local + JWT), Cloudinary, Nodemailer, bcrypt.

## Project structure

```
app.js            # Express app setup, middleware, route mounting
db.js             # MongoDB connection (Mongoose)
controllers/       # Route handlers
middlewares/       # Auth middleware (Passport strategies, JWT)
models/            # Mongoose schemas
routes/            # page / admin / person / menu / room / reservation routes
views/             # EJS templates
public/            # Static assets
```

## Running locally

```bash
npm install
```

Create a `.env` file with:

```
PORT=3000
DB_URI=<your MongoDB connection string>
CLOUD_NAME=<Cloudinary cloud name>
CLOUD_API_KEY=<Cloudinary API key>
CLOUD_API_SECRET=<Cloudinary API secret>
```

```bash
npm start
```

## License

MIT
