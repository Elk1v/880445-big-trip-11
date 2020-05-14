import moment from "moment";
import momentRandom from "moment-random";
import {getRandomArrayItem} from "../utils/common";
import {PICTURE, CITIES, EVENT_TYPES} from "./data";
import {getOffersList, eventDescriptions} from "./data";

const getDestinationInfo = () =>{
  return {
    name: getRandomArrayItem(CITIES),
    description: eventDescriptions.sort(() => Math.random() - Math.random())
    .slice(0, 5)
    .join(``),
    picture: PICTURE,
  };
};

const DateRange = {
  FROM: `2020/01/01 00:00:00`,
  TO: `2020/12/31 23:59:59`,
};

export const generateEventItem = () => {
  const randomDateFrom = moment.utc(momentRandom(DateRange.TO, DateRange.FROM));
  const randomDateTo = moment.utc(momentRandom(DateRange.TO, DateRange.FROM));
  const isDateFrom = moment.utc(moment(randomDateFrom).isBefore(randomDateTo, `day`) ? randomDateFrom : randomDateTo);
  const isDateTo = moment.utc(moment(randomDateTo).isAfter(randomDateFrom, `day`) ? randomDateTo : randomDateFrom);

  return {
    id: String(new Date() + Math.random()),
    eventType: getRandomArrayItem(EVENT_TYPES),
    offers: getOffersList(),
    basePrice: Math.floor(Math.random() * 100),
    destination: getDestinationInfo(),
    isFavorite: Math.random() > 0.5,
    dateFrom: moment.utc(moment(isDateFrom)),
    dateTo: moment.utc(moment(isDateTo)),
  };
};

export const generateEventItems = (count) => {
  return new Array(count)
      .fill(``)
      .map(generateEventItem);
};

