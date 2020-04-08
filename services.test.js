const { createCachedGetBondsData } = require("./services");

const mockGetBondsData = jest.fn(({ date, isins }) => {
  return isins.map((isin) => ({ isin, data: {} }));
});

const getBondsDataWithCache = createCachedGetBondsData(mockGetBondsData);

describe("getBondsDataWithCache", () => {
  it("should call api method", async () => {
    const result = await getBondsDataWithCache({
      date: "20180120",
      isins: ["XS0971721963", "RU000A0JU4L3"],
    });

    expect(result).toEqual([
      { isin: "XS0971721963", data: {} },
      { isin: "RU000A0JU4L3", data: {} },
    ]);

    expect(mockGetBondsData).toHaveBeenCalledTimes(1);
  });

  it("should NOT call api method and return from cache", async () => {
    const result = await getBondsDataWithCache({
      date: "20180120",
      isins: ["XS0971721963", "RU000A0JU4L3"],
    });
    expect(result).toEqual([
      { isin: "XS0971721963", data: {} },
      { isin: "RU000A0JU4L3", data: {} },
    ]);

    expect(mockGetBondsData).toHaveBeenCalledTimes(1);
  });

  it("should call api method and return from cache", async () => {
    const result = await getBondsDataWithCache({
      date: "20180120",
      isins: ["XS0971721963", "RU000A0JU4L3", "EU111B9JU4KO"],
    });
    expect(result).toEqual([
      { isin: "XS0971721963", data: {} },
      { isin: "RU000A0JU4L3", data: {} },
      { isin: "EU111B9JU4KO", data: {} },
    ]);

    expect(mockGetBondsData).toHaveBeenCalledTimes(2);
    expect(mockGetBondsData).toHaveBeenLastCalledWith({
      date: "20180120",
      isins: ["EU111B9JU4KO"],
    });
  });
});
