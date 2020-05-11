import moment from "moment";
import {FilterType} from "../consts";

export const getFutureEvents = (events) => {
  const now = moment();

  return events.filter(({dateFrom}) => moment(dateFrom).isAfter(now));
};

export const getPastEvents = (events) => {
  const now = moment();

  return events.filter(({dateFrom}) => moment(dateFrom).isBefore(now));
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFutureEvents(points);
    case FilterType.PAST:
      return getPastEvents(points);
  }

  return points;
};
