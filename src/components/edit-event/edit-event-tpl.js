import {ActivityType} from "../../mock/data";

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

export const editEventTemplate = (eventItem, eventType) => {
  const {eventTypes, randomEventType, offers, city, isFavorite} = eventItem;

  const transferTypes = eventTypes.slice(0, 7);
  const activityTypes = eventTypes.slice(7);
  
  const type = eventType === undefined ? randomEventType : eventType;

  const eventIcon = type.toLowerCase();


  return (`
    <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
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
          ${type} ${getCourse(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>
  
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
        </div>
  
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
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
