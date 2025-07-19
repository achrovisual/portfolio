import pino from "pino";

const transport =
  process.env.NODE_ENV !== "production"
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined;

const logger = pino({
  level: process.env.NEXT_PUBLIC_LOG_LEVEL || "info",
  base: {
    env: process.env.NODE_ENV,
    service: "portfolio-app",
  },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  transport,
});

export default logger;
