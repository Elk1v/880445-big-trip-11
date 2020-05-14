import {ActivityType} from "../../mock/data";
import {EVENT_TYPES, CITIES, getOffersList} from "../../mock/data";
import moment from "moment";

const getEventTypeItems = (typesArr) => {
  return typesArr.map((type) => {
    return (
      `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
      </div>
      `
    );
  }).join(`\n`);
};

const getAvailableOffers = (arr) => {
  return arr.map((it) => {
    const isChecked = Math.random() > 0.5;
    return (
      `
      <div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.name}-1" type="checkbox" name="event-offer-${it.name}" ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${it.name}-1">
          <span class="event__offer-title">${it.action}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
        </label>
      </div>
      `
    );
  }).join(` `);
};

const getCourse = (eventType) => {
  if ((eventType === ActivityType.CHECKIN) || (eventType === ActivityType.SIGHTSEEING) || (eventType === ActivityType.RESTAURANT)) {
    return `in`;
  } else {
    return `to`;
  }
};

export const editEventTemplate = (eventItem, options = {}) => {
  const {eventType, offers, destination, isFavorite, dateFrom, dateTo} = options;
  const getActiveOffers = offers.filter((it) => it.isActive).slice(0, 2);

  const transferTypes = EVENT_TYPES.slice(0, 7);
  const activityTypes = EVENT_TYPES.slice(7);
  const eventIcon = eventType.toLowerCase();

  const formatedDateFrom = moment(dateFrom).format(`DD/MM/YY hh:mm`);
  const formatedDateTo = moment(dateTo).format(`DD/MM/YY hh:mm`);

  const getTotalOffersPrice = getActiveOffers.reduce((prev, cur) => {
    return prev + cur.price;
  }, 0);

  return (`
    <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="get">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventIcon}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
                ${getEventTypeItems(transferTypes)}
            </fieldset>
  
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
                ${getEventTypeItems(activityTypes)}
            </fieldset>
          </div>
        </div>
  
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${eventType} ${getCourse(eventType)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${CITIES.map((city) =>
      `<option value=${city}></option>`
    ).join(` `)}
          </datalist>
        </div>
  
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatedDateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatedDateTo}">
        </div>
  
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getTotalOffersPrice}">
        </div>
  
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
  
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `Checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
  
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
          <div class="event__available-offers">
            ${getAvailableOffers(offers)}
          </div>
        </section>
      </section>
    </form>
  </li>
      `);
};

export const parseFormData = (formData) => {
  const getDateFrom = formData.get(`event-start-time`);
  const getDateTo = formData.get(`event-end-time`);

  return {
    eventType: formData.get(`event-type`),
    city: formData.get(`event-destination`),
    price: formData.get(`event-price`),
    dateFrom: moment(getDateFrom),
    dateTo: moment(getDateTo),
    offers: getOffersList(),
    isFavorite: formData.get(`event-favorite`) ? true : false,
    basePrice: formData.get(`event-price`),
  };
};
