const { mergeWithInitOrder } = require("./utils");

const clientCache = {
  check(cachedResult, date, isins) {
    return isins.reduce(
      (acc, isin) => {
        if (cachedResult[date] && cachedResult[date][isin]) {
          acc.cachedIsins.push({ isin, data: cachedResult[date][isin].data });
          return acc;
        }
        acc.newIsins.push(isin);
        return acc;
      },
      { cachedIsins: [], newIsins: [] }
    );
  },

  update(cachedResult, date, results) {
    return results.reduce((acc, { isin, data }) => {
      acc[date] = { ...acc[date], [isin]: { data } };
      return acc;
    }, cachedResult);
  },
};

const createCachedGetBondsData = (getBondsData) => {
  const cache = {};
  return async ({ date, isins }) => {
    const { cachedIsins, newIsins } = clientCache.check(cache, date, isins);

    if (newIsins.length) {
      const results = await getBondsData({ date, isins: newIsins });
      clientCache.update(cache, date, results);
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
