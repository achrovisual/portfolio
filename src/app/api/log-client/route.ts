import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import logger from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const logEntry = await request.json();
    const correlationId =
      request.headers.get("x-correlation-id") ||
      logEntry.correlationId ||
      uuidv4();

    const clientApiLogger = logger.child({
      correlationId,
      apiRoute: "ClientLog",
    });

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
      default:
        clientApiLogger.info(`Client Log (unknown level): ${message}`, {
          level,
          ...rest,
        });
    }

    return NextResponse.json({ status: "Log received" }, { status: 200 });
  } catch (error: any) {
    logger.error("Failed to process client log:", {
      error: error.message,
      stack: error.stack,
      requestBody: error.message.includes("JSON") ? "Invalid JSON" : undefined,
    });
    return NextResponse.json(
      { error: "Failed to process log" },
      { status: 500 }
    );
  }
}
