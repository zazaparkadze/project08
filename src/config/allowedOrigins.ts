export const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://project08-bay.vercel.app/", "https://www.parkadze.com"]
    : ["http://localhost:3000"];
