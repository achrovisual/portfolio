import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function getCorrelationId(): Promise<string> {
  try {
    const requestHeaders = await headers();
    return requestHeaders.get("x-correlation-id") || uuidv4();
  } catch (error) {
    return uuidv4();
  }
}
