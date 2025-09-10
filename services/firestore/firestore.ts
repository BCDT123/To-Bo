/**
 * Centralizes the exports of Firestore services.
 *
 * Benefits:
 * - Makes code maintenance and organization easier.
 * - Avoids long and repetitive import paths in other files.
 * - Ideal for testing and scaling the project.
 */

// Exports all functions related to data fetching from Firestore.
export * from "./fetch";

/**
 * Exports all functions related to writing, updating, and deleting data in Firestore.
 */
export * from "./write";

/**
 * Exports all functions related to authentication in Firestore.
 */
export * from "./auth";
