import {getRandomArrayItem} from "../utils.js";
import {PICTURE, CITIES, EVENT_TYPES} from "../data.js";
import {getOffersList, eventDescriptions} from "../data.js";

const generateEvent = () => {
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

const generateEvents = (count) => {
  return new Array(count)
      .fill(``)
      .map(generateEvent);
};

export {generateEvents, generateEvent};


