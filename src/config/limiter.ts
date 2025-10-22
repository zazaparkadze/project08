import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
  tokensPerInterval: 150,
  interval: "hour",
  fireImmediately: true,
});
