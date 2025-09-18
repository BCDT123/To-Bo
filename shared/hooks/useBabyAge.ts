import { useTranslations } from "next-intl";
import getAgeFromDate from "@/shared/utilities/getAge";

type FirestoreTimestamp = { seconds: number; nanoseconds: number };
type InputDate = Date | string | number | FirestoreTimestamp;

export function useBabyAge(birthDate?: InputDate): string | null {
  const t = useTranslations("common");
  const tBaby = useTranslations("baby");

  if (!birthDate) return null;

  const age = getAgeFromDate(birthDate);

  if (age.years > 0) {
    return `${age.years} ${age.years === 1 ? t("year") : t("years")}${
      age.months > 0
        ? `, ${age.months} ${age.months === 1 ? t("month") : t("months")}`
        : ""
    } ${tBaby("old")}`;
  }

  if (age.months > 0) {
    return `${age.months} ${age.months === 1 ? t("month") : t("months")}, ${
      age.weeks
    } ${age.weeks === 1 ? t("week") : t("weeks")} ${tBaby("old")}`;
  }

  if (age.weeks > 0) {
    return `${age.weeks} ${age.weeks === 1 ? t("week") : t("weeks")}${
      age.days > 0
        ? `, ${age.days} ${age.days === 1 ? t("day") : t("days")}`
        : ""
    } ${tBaby("old")}`;
  }

  return `${age.days || 0} ${t("days")} ${tBaby("old")}`;
}
