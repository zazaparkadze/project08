export const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://project08-bay.vercel.app/", "http://localhost:3000"]
    : ["http://localhost:3000", "https://project08-bay.vercel.app/"];
