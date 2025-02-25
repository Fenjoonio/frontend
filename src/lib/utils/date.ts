import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

export const convertToJalaliDate = (date: string | null) => {
  return date ? new DateObject(date).convert(persian) : null;
};

export const convertToGregorianDate = (date: string | null) => {
  return date ? new DateObject({ date: new Date(date), calendar: gregorian }) : null;
};
