import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import logger from "@/lib/logger";

const supportedLogLevels = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
];

export async function POST(request: Request) {
  let correlationId: string | undefined;

  try {
    const logEntry = await request.json();

    correlationId =
      request.headers.get("x-correlation-id") ||
      (logEntry && typeof logEntry === "object"
        ? logEntry.correlationId
        : undefined) ||
      uuidv4();

    const clientApiLogger = logger.child({
      correlationId,
      apiRoute: "ClientLog",
    });

    if (
      typeof logEntry !== "object" ||
      logEntry === null ||
      !("level" in logEntry) ||
      !("message" in logEntry) ||
      typeof logEntry.message !== "string" ||
      !supportedLogLevels.includes(logEntry.level)
    ) {
      clientApiLogger.warn("Invalid client log entry received.", {
        receivedLogEntry: logEntry,
        validationError:
          "Missing or invalid 'level' or 'message' field, or 'level' is not supported.",
      });
      return NextResponse.json(
        {
          error:
            "Invalid log entry: 'level' and 'message' are required and 'level' must be valid.",
        },
        { status: 400 }
      );
    }

    const { level, message, ...rest } = logEntry;

    switch (level) {
      case "info":
        clientApiLogger.info(message, rest);
        break;
      case "warn":
        clientApiLogger.warn(message, rest);
        break;
      case "error":
        clientApiLogger.error(message, rest);
        break;
      case "debug":
        clientApiLogger.debug(message, rest);
        break;
      case "trace":
        clientApiLogger.trace(message, rest);
        break;
      case "fatal":
        clientApiLogger.fatal(message, rest);
        break;
      case "silent":
        // Do nothing for silent logs, but acknowledge them
        break;
      default:
        clientApiLogger.info(`Client Log (unknown level): ${message}`, {
          level,
          ...rest,
        });
    }

    return NextResponse.json({ status: "Log received" }, { status: 200 });
  } catch (error: any) {
    const isJsonParsingError =
      error instanceof SyntaxError || error.name === "SyntaxError";

    const errorLogger = correlationId
      ? logger.child({ correlationId, apiRoute: "ClientLog" })
      : logger;

    errorLogger.error("Failed to process client log:", {
      error: error.message,
      stack: error.stack,
      requestBody: isJsonParsingError ? "Invalid JSON" : undefined,
    });
    return NextResponse.json(
      { error: "Failed to process log" },
      { status: 500 }
    );
  }
}
