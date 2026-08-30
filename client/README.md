# Phones Client

Client application for managing phones and viewing their preorders.

## Features

- View phones
- Create phones
- Upload and display phone images
- Delete phones
- Toggle NFC support
- Filter phones by brand
- Pagination using URL query parameters
- View phone preorders on a separate page
- Loading and error handling
- Automatic cache updates with RTK Query

## Technologies

- React
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Formik
- Yup
- SCSS Modules

## Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/phones` | Phones list |
| `/phones/new` | Create phone |
| `/phones/:phoneId/preorders` | Phone preorders |

## API

The client uses the following API:

```text
http://localhost:5000/api
```

The backend server must be running on port `5000`.

## Installation

```bash
npm install
```

## Running the application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Query parameters

Phones filtering and pagination are stored in the URL:

```text
/phones?page=1&brand=Samsung
```

The client converts the page number into `limit` and `offset` parameters for the backend.

## Image uploads

Phone images are sent using `FormData` and displayed from:

```text
http://localhost:5000/static/images/:filename
```