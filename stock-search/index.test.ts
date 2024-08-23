import { searchStock } from ".";

describe("Stock search", () => {
  it("query is empty", async () => {
    await expect(searchStock("")).rejects.toThrow();
  });

  it("query is undefined", async () => {
    await expect(searchStock(undefined)).rejects.toThrow();
  });
});

describe("Specific queries", () => {
  it.skip("query is AAPL", async () => {
    const response = await searchStock("aapl");

    expect(response).toBeInstanceOf(Array);
    /*expect(response[0]).toHaveProperty("symbol");
    expect(response[0]).toHaveProperty("exchDisp");*/
  });

  it.skip("query is full company name", async () => {
    const response = await searchStock("Advanced Micro Devices");
    expect(response).toBeInstanceOf(Array);
    //expect(response[0].symbol).toBe("AMD");
  });
});
