// export default function toDate(value: any): Date {
//   // Firestore Timestamp: { seconds: number, nanoseconds: number }
//   if (value && typeof value === "object" && "seconds" in value) {
//     return new Date(value.seconds * 1000);
//   }
//   // ISO string, number, or Date
//   return new Date(value);
// }

export default function toDate(value: any): Date {
  // Firestore Timestamp: { seconds: number, nanoseconds: number }
  if (value && typeof value === "object" && "seconds" in value) {
    return new Date(value.seconds * 1000);
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? new Date() : date;
}

export const formatDate = (value: any): string => {
  if (value?.seconds)
    return new Date(value.seconds * 1000).toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value))
    return value;
  const date = new Date(value);
  return !isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : "";
};
