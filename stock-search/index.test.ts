import { searchStock } from ".";

describe("Stock search", () => {
  it("query is empty", async () => {
    await expect(searchStock("")).rejects.toThrow("could not find stock");
  });

  it("query is undefined", async () => {
    await expect(searchStock(undefined)).rejects.toThrow();
  });
});
