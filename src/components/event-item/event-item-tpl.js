import {ActivityType} from "../../mock/data";
import moment from "moment";

export const createEventItemTemplate = (eventItem) => {
  const {randomEventType, city, offers, dateFrom, dateTo} = eventItem;

  const eventDuration = moment(dateTo).diff(dateFrom, `minutes`);
  const formatedDateFrom = moment(dateFrom).format(`hh:mm`);
  const formatedDateTo = moment(dateTo).format(`hh:mm`);
  const eventIcon = randomEventType.toLowerCase();
  const getActiveOffers = offers.filter((it) => it.isActive).slice(0, 2);

  const formatDuration = (inMinutes) => {

    const duration = moment.utc(moment.duration(inMinutes, `minutes`).asMilliseconds());
    const lessThenDayDuration = moment.utc(moment.duration(24, `hours`).asMilliseconds());
    const lessThenHourDuration = moment.utc(moment.duration(60, `minutes`).asMilliseconds());

    /* const duration = moment.utc(moment.duration(inMinutes, `minutes`).asMilliseconds()).format(`DDDD[D] HH[H] mm[M]`); */

    if ((duration < lessThenDayDuration) && (duration < lessThenHourDuration)) { /*(duration < lessThenDayDuration)*/
      const fduration = moment.utc(moment.duration(inMinutes, `minutes`).asMilliseconds()).format(`mm[M]`);
      return fduration;
    } else if (duration < lessThenDayDuration) {
      const fduration = moment.utc(moment.duration(inMinutes, `minutes`).asMilliseconds()).format(`HH[H] mm[M]`);
      return fduration;
    } else {
      const fduration = moment.utc(moment.duration(inMinutes, `minutes`).asMilliseconds()).format(`DDDD[D] HH[H] mm[M]`);
      return fduration;
    }
  };

  const getCourse = (eventType) => {
    if ((eventType === ActivityType.CHECKIN) || (eventType === ActivityType.SIGHTSEEING) || (eventType === ActivityType.RESTAURANT)) {
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
              <time class="event__start-time" datetime="${dateFrom}">${formatedDateFrom}</time>
              &mdash;
              <time class="event__end-time" datetime="${dateTo}">${formatedDateTo}</time>
            </p>
            <p class="event__duration">${formatDuration(eventDuration)}</p>
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
