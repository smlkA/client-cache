const { mergeWithInitOrder } = require("./utils");

const clientCache = {
  lsKey: "client_cache",

  check(date, isins) {
    const cache = JSON.parse(localStorage.getItem(this.lsKey));
    if (cache) {
      return isins.reduce(
        (acc, isin) => {
          if (cache[date] && cache[date][isin]) {
            acc.cachedIsins.push({ isin, data: cache[date][isin].data });
            return acc;
          }
          acc.newIsins.push(isin);
          return acc;
        },
        { cachedIsins: [], newIsins: [] }
      );
    } else {
      return { cachedIsins: [], newIsins: isins };
    }
  },

  update(date, results) {
    const cache = JSON.parse(localStorage.getItem(this.lsKey)) || {};

    const updateCache = results.reduce((acc, { isin, data }) => {
      acc[date] = { ...acc[date], [isin]: { data } };
      return acc;
    }, cache);

    return localStorage.setItem(this.lsKey, JSON.stringify(updateCache));
  },
};

const createCachedGetBondsData = (getBondsData) => {
  return async ({ date, isins }) => {
    const { cachedIsins, newIsins } = clientCache.check(date, isins);

    if (newIsins.length) {
      const results = await getBondsData({ date, isins: newIsins });
      clientCache.update(date, results);
      return mergeWithInitOrder(isins, cachedIsins, results);
    }
    return cachedIsins;
  };
};

const getBondsData = async ({ date, isins }) => {
  const result = await http.post({
    url: `/bonds/${date}`,
    body: isins,
  });
  return result;
};

const getBondsDataWithCache = createCachedGetBondsData(getBondsData);

module.exports = {
  createCachedGetBondsData,
  getBondsData,
  getBondsDataWithCache,
};
