export const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "http://localhost:3000",
        "https://www.parkadze.com",
        "https://project08-bay.vercel.app",
        "https://www.google.com",
        "https://vercel.com",
        "https://project08-bay-git-feature-jwt-zaza-parkadze.vercel.app",
      ]
    : [
        "http://localhost:3000",
        "https://www.google.com",
        "https://project08-bay.vercel.app",
      ];
