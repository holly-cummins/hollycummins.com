import { draftsFilter } from "./filters";

describe("the graphql filters", () => {
  describe("in non-production environments", () => {
    it("gives a basic filter if there are no other filters", async () => {
      expect(draftsFilter()).toBe('filter: { fields: { slug: { ne: "" } } }');
    });

    it("combines the filters if a filter is passed in", async () => {
      expect(draftsFilter({ frontmatter: { type: { eq: "$type" } } })).toBe(
        'filter: { fields: { slug: { ne: "" } }, frontmatter: { type: { eq: $type } } }'
      );
    });
  });

  describe("in production environments", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules(); // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
      process.env.ACTIVE_ENV = "production";
    });

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });
    it("gives a basic filter if there are no other filters", async () => {
      expect(draftsFilter()).toBe('filter: { fields: { slug: { ne: "" }, prefix: { ne: "" } } }');
    });

    it("combines the filters if a filter is passed in", async () => {
      expect(draftsFilter({ frontmatter: { type: { eq: "$type" } } })).toBe(
        'filter: { fields: { slug: { ne: "" }, prefix: { ne: "" } }, frontmatter: { type: { eq: $type } } }'
      );
    });
  });
});
