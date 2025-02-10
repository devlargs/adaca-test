import { COUNTRY_CODES } from "@/constants/countryCodes";

export const getCountryCode = () => {
  if (typeof window === "undefined") return "";

  const countries = COUNTRY_CODES;
  const currentCountry = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).country
    : "";

  return [
    countries.find((country) => country.name === currentCountry)?.code,
    currentCountry,
  ];
};
