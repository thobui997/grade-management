import * as dayjs from 'dayjs';

import * as localeData from 'dayjs/plugin/localeData';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeek);

export default dayjs;
