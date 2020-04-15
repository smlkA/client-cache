const { mergeWithInitOrder } = require("./utils");

describe("mergeWithInitOrder", () => {
  it("should merge 2 array with 1,2,3 order", () => {
    expect(
      mergeWithInitOrder(
        ["1", "2", "3"],
        [{ isin: "2", data: { a: 100 } }],
        [
          { isin: "1", data: {} },
          { isin: "3", data: {} },
        ]
      )
    ).toEqual([
      { isin: "1", data: {} },
      { isin: "2", data: { a: 100 } },
      { isin: "3", data: {} },
    ]);
  });
});
