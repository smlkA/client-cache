const mergeWithInitOrder = (initArray, cachedIsins, results) => {
  if (!cachedIsins.length) {
    return results;
  }
  const resultObject = [...cachedIsins, ...results].reduce((acc, elem) => {
    acc[elem.isin] = elem.data;
    return acc;
  }, {});
  return initArray.map((isin) => ({ isin, data: resultObject[isin] }));
};

module.exports = { mergeWithInitOrder };
