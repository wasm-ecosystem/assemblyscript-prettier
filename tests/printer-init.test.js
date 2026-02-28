import asPlugin from "../src/plugin.js";

test("printer should be initialized at module load time", () => {
  // The printer should not be empty at module load time
  expect(asPlugin.printers).toBeDefined();
  expect(asPlugin.printers["as-estree"]).toBeDefined();

  // The printer should have the print function available
  expect(typeof asPlugin.printers["as-estree"].print).toBe("function");

  // The printer should have the printComment function available
  expect(typeof asPlugin.printers["as-estree"].printComment).toBe("function");

  // The printer should have other essential methods/properties from estree
  expect(typeof asPlugin.printers["as-estree"].embed).toBe("function");
  expect(asPlugin.printers["as-estree"].handleComments).toBeDefined();
});
