/**
 * Logs the error and throws a new Error with a custom message.
 * @param logMsg Message to log in the console.
 * @param error The original error object.
 * @param throwMsg Message for the thrown Error.
 */
export function handleError(logMsg: string, error: unknown, throwMsg: string) {
  console.error(logMsg, error);
  throw new Error(throwMsg);
}
