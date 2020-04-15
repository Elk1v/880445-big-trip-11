import {activityType} from "../mock/data.js";

export const createEventItemTemplate = (event) => {

  const {randomEventType, city, offers} = event;

  const eventIcon = randomEventType.toLowerCase();
  const eventStartTime = `10:30`; // временно
  const eventEndTime = `11:01`;
  const eventDuration = `31M`;

  const getActiveOffers = offers.filter((it) => it.isActive).slice(0, 2);

  const getCourse = (eventType) => {
    if ((eventType === activityType.CHECKIN) || (eventType === activityType.SIGHTSEEING) || (eventType === activityType.RESTAURANT)) {
      return `in`;
    } else {
      return `to`;
    }
  };

  const getOffers = (arr) => {
    return arr.map((it) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${it.action}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
        </li>`
      );
    }).join(`\n`);
  };

  const getTotalOffersPrice = getActiveOffers.reduce((prev, cur) => {
    return prev + cur.price;
  }, 0);

  return (
    `
      <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventIcon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${randomEventType} ${getCourse(randomEventType)} ${city}</h3>
  
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${eventEndTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
  
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${getTotalOffersPrice}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffers(getActiveOffers)}
        </ul>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  
      `
  );
};
