import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
  tokensPerInterval: 1111,
  interval: "hour",
  fireImmediately: true,
});
