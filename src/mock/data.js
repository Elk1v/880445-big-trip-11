
export const CountedElement = {
  EVENT: 5,
  PICTURE: 5,
};

export const ActivityType = {
  CHECKIN: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`,
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const CITIES = [
  `Amsterdam`, `Chamonix`, `Geneva`, `SaintPetersburg`
];

export const PICTURE = `http://picsum.photos/248/152?r=${Math.random()}`;

export const getOffersList = () => {

  const offers = [
    {
      isActive: Math.random() > 0.5,
      name: `luggage`,
      action: `Add luggage`,
      price: 30,

    },
    {
      isActive: Math.random() > 0.5,
      name: `comfort`,
      action: `Switch to comfort class`,
      price: 100,
    },
    {
      isActive: Math.random() > 0.5,
      name: `meal`,
      action: `Add meal`,
      price: 15,
    },
    {
      isActive: Math.random() > 0.5,
      name: `seats`,
      action: `Choose sits`,
      price: 5,
    },
    {
      isActive: Math.random() > 0.5,
      name: `train`,
      action: `Travel by train`,
      price: 40,
    },
  ];

  return offers;
};

export const eventDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus. `,
];
