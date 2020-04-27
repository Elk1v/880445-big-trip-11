import {EscButton} from "../consts";

export const getRandomBetween = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomBetween(0, array.length);

  return array[randomIndex];
};

export const onEscKeyDown = (evt, handler) => {
  const isEscKey = evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC;

  if (isEscKey) {
    handler();
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};
