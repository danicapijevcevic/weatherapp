export const filterItems = (items, daily) =>
  items.filter((_, index) => daily[index]);
const sliceTo24 = (n, from) => n.slice(from, from + 24);

const convertToDays = (n, t, code, from, days) =>
  from % 24 === 0
    ? days.concat({
        id: days.length,
        hours: sliceTo24(n, from).map((item, index) => ({
          time: item.slice(11, 13),
          temp: sliceTo24(t, from)[index],
          code: sliceTo24(code, from)[index],
        })),
        day: new Date(n[from]).getDay(),
        weathercode: code[from + 12],
        time: n[from],
        ...setMinMax(sliceTo24(t, from)),
      })
    : days;

export const getSmaller = (a, n) => (a < n ? a : n);
export const getHigher = (a, n) => (a > n ? a : n);

export const findNumber =
  (n, from = 0, number = n[0]) =>
  (fn) =>
    from === n.length
      ? number
      : findNumber(n, from + 1, fn(n[from + 1], number))(fn);

export const setMinMax = (n) => {
  const getNumber = findNumber(n);
  return {
    min: getNumber(getSmaller),
    max: getNumber(getHigher),
  };
};

export const convertHoursToDays = (n, t, code, from = 0, days = []) =>
  from === n.length
    ? days
    : convertHoursToDays(
        n,
        t,
        code,
        from + 1,
        convertToDays(n, t, code, from, days)
      );

export const getSeason = () => {
  const day = +new Date().toISOString().slice(8, 10);
  const month = new Date().getMonth();
  const index = (month * 30.4375 + day + 10) / 91.3;

  return {
    0: "winter",
    1: "spring",
    2: "summer",
    3: "autumn",
    4: "winter",
  }[index << 0];
};

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
