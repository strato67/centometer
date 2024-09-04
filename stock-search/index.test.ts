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
  it("query is AAPL", async () => {
    const response = await searchStock("aapl");
    expect(response).toBeDefined();

    if (response) {
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toHaveProperty("Symbol");
      expect(response[0]).toHaveProperty("Index");
      expect(response[0]).toHaveProperty("Description");
      expect(response[0].Symbol).toBe("AAPL")
    }
  });

  it("query is full company name", async () => {
    const response = await searchStock("Advanced Micro Devices");
    expect(response).toBeDefined();

    if (response) {
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toHaveProperty("Symbol");
    }
  });

  it("query does not exist", async () => {
    await expect(searchStock("blah blah bafdad")).rejects.toThrow();
  });
});
