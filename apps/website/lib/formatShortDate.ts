import { format } from 'date-fns';

export const formatShortDate = (date: string) => {
  const _date = new Date(date);

  return format(_date, 'MMM d, y');
};

export const formatSchemaOrgDate = (date: string) => {
  const _date = new Date(date);

  return _date.toISOString();
};
