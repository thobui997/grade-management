import dateUtils from '@app/lib/date-utils';

const formatDate = (date: string) => {
  if (!date) return;
  return dateUtils.format(date, 'DD/MM/YYYY');
};

export default formatDate;
