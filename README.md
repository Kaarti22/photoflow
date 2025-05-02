# 📄 Environment Variables Setup

To run the **Social Media Website** project successfully, you must create the following environment files in the **backend** and **frontend**.

---

## 1. `Backend/config.env`

Create a file named `config.env` inside the `Backend/` folder with the following content:

```env
NODE_ENV=development
PORT=8000

DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<cluster_url>/<database_name>?retryWrites=true&w=majority&appName=<app_name>

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL=your_email@example.com
EMAIL_PASS=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CARETAKER_SERVER_URL=http://localhost:3001
CARETAKER_API_KEY=your_caretaker_api_key
```
---

## 2. `Frontend/.env.local`

Create a file named `.env.local` inside the `Frontend/` folder with the following content:

```env
NEXT_PUBLIC_BACKEND_API=http://localhost:8000/api/v1
```
