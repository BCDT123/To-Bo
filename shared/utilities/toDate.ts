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
