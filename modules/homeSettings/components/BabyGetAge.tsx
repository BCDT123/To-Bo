import React from "react";
import getAgeFromDate from "@/shared/utilities/getAge";
import { useTranslations } from "next-intl";

type BabyAgeProps = {
  birthDate?: Date | string | number | { seconds: number; nanoseconds: number };
  className?: string;
};

export default function BabyGetAge({
  birthDate,
  className = "",
}: BabyAgeProps) {
  const t = useTranslations("common");
  const tBaby = useTranslations("baby");
  if (!birthDate) return null;
  const age = getAgeFromDate(birthDate);

  let ageText = "0 " + t("days") + " " + tBaby("old");
  if (age.years > 0) {
    ageText = `${age.years} ${age.years === 1 ? t("year") : t("years")}${
      age.months > 0
        ? `, ${age.months} ${age.months === 1 ? t("month") : t("months")}`
        : ""
    } ${tBaby("old")}`;
  } else if (age.months > 0) {
    ageText = `${age.months} ${age.months === 1 ? t("month") : t("months")}, ${
      age.weeks
    } ${age.weeks === 1 ? t("week") : t("weeks")} ${tBaby("old")}`;
  } else if (age.weeks > 0) {
    ageText = `${age.weeks} ${age.weeks === 1 ? t("week") : t("weeks")}${
      age.days > 0
        ? `, ${age.days} ${age.days === 1 ? t("day") : t("days")} ${tBaby(
            "old"
          )}`
        : ""
    }`;
  } else if (age.days > 0) {
    ageText = `${age.days} ${age.days === 1 ? t("day") : t("days")} ${tBaby(
      "old"
    )}`;
  }

  return (
    <span className={`min-w-0 truncate text-xs text-gray-500 ${className}`}>
      {ageText}
    </span>
  );
}
