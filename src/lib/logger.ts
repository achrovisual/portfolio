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

const supportedLogLevels = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
];

const envLogLevel = process.env.NEXT_PUBLIC_LOG_LEVEL;

const logLevel = supportedLogLevels.includes(envLogLevel as string)
  ? envLogLevel
  : "info";

const logger = pino({
  level: logLevel,
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
