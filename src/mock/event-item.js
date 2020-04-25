import {getRandomArrayItem} from "../utils/common";
import {PICTURE, CITIES, EVENT_TYPES} from "./data";
import {getOffersList, eventDescriptions} from "./data";

const generateEventItem = () => {
  return {
    eventTypes: EVENT_TYPES,
    randomEventType: getRandomArrayItem(EVENT_TYPES),
    city: getRandomArrayItem(CITIES),
    description: eventDescriptions.sort(() => Math.random() - Math.random())
      .slice(0, 5)
      .join(``),
    offers: getOffersList(),
    pickture: PICTURE,
  };
};

const generateEventItems = (count) => {
  return new Array(count)
      .fill(``)
      .map(generateEventItem);
};

export {generateEventItem, generateEventItems};


