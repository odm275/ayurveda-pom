import dayjs from 'dayjs';

export function findGapInDays(d1Str, d2Str) {
  const d1 = dayjs(d1Str);
  const d2 = dayjs(d2Str);
  const distance = Math.abs(dayjs(d1).diff(d2, 'day')) - 1;
  return distance;
}
export function generateData(size, d1Str) {
  return Array(size)
    .fill()
    .map((_, i) => ({
      date: dayjs(d1Str)
        .add(i + 1, 'day')
        .format('MM-DD-YYYY'),
      count: 0
    }));
}

export function generateDatesGap(d1Str, d2Str) {
  // Find the distance between d1 and d2 in days.

  const diffDays = findGapInDays(d1Str, d2Str);
  const newData = generateData(diffDays, d1Str);
  return newData;
}

export const pomDataFormatter = (acc, obj, i, arr) => {
  const obj2 = arr[i + 1];
  const d1Str = obj?.date;
  const d2Str = obj2?.date;
  const objInAcc = acc.find((obj) => obj.date === d1Str);
  // 1) If there is no next date.
  if (!obj2) {
    if (objInAcc) {
      return acc;
    }
    return [...acc, obj];
  }
  // 2) If there's no gap between dates aka one day apart
  const oneDayGap = dayjs(d1Str).add(1, 'day').isSame(d2Str, 'day');
  if (oneDayGap) {
    if (objInAcc) {
      return [...acc, obj2];
    }
    return [...acc, obj, obj2];
  }

  // 3) There's a gap between days larger than one 1

  // a) Generate a new array to account for the gap with a default of count:0
  const gapsData = generateDatesGap(d1Str, d2Str);

  // b) Concat the gapsData between obj1 and obj2
  if (objInAcc) {
    return [...acc, ...gapsData, obj2];
  }
  return [...acc, obj, ...gapsData, obj2];
};
