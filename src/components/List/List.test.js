import React from "react";
import { render, screen } from "@testing-library/react";

import List from "./List";

import theme from "../../theme/theme.yaml";

describe("List", () => {
  describe("for an internal post", () => {
    const title = "some post";
    const slug = "sluggaroo";
    const node = {
      node: {
        frontmatter: { category: "test-stuff", title },
        fields: { source: "some-source", slug }
      }
    };
    const edges = [node];

    beforeEach(() => {
      const tree = render(<List edges={edges} theme={theme} />);
    });

    it("renders the title", () => {
      expect(screen.getByText(title)).toBeTruthy();
    });

    it("renders the correct link", () => {
      const link = screen.getByRole("link");
      expect(link).toBeTruthy();
      // Hardcoding the host is a bit risky but this should always be true in  test environment
      expect(link.href).toBe("http://localhost/" + slug);
    });

    it("renders an icon", async () => {
      // We could try and dig into the HMTL to find the exact image source, but let's trust the icon sets the right alt text
      // Length should be one - one for the title, and then no others
      expect(screen.getByTitle(/.*icon/)).toBeTruthy();
    });
  });

  describe("for an external post", () => {
    const title = "another post";
    const slug = "unused";
    const url = "http://elsewhere.com";
    const node = {
      node: {
        frontmatter: { category: "test-stuff", title, url },
        fields: { source: "some-source", slug }
      }
    };
    const edges = [node];

    beforeEach(() => {
      const tree = render(<List edges={edges} theme={theme} />);
    });

    it("renders the title", () => {
      expect(screen.getByText(title)).toBeTruthy();
    });

    it("renders the correct link", () => {
      const link = screen.getByRole("link");
      expect(link).toBeTruthy();
      expect(link.href).toBe(url + "/");
    });
  });

  describe("for an post with icons disabled", () => {
    const title = "some post";
    const slug = "sluggaroo";
    const node = {
      node: {
        frontmatter: { category: "test-stuff", title },
        fields: { source: "some-source", slug }
      }
    };
    const edges = [node];

    beforeEach(() => {
      const tree = render(<List edges={edges} theme={theme} showIcon={false} />);
    });

    it("renders the title", () => {
      expect(screen.getByText(title)).toBeTruthy();
    });

    it("renders the correct link", () => {
      const link = screen.getByRole("link");
      expect(link).toBeTruthy();
      // Hardcoding the host is a bit risky but this should always be true in  test environment
      expect(link.href).toBe("http://localhost/" + slug);
    });

    it("does not render an icon", async () => {
      // We could try and dig into the HMTL to find the exact image source, but let's trust the icon sets the right alt text
      expect(screen.queryByTitle(/.*icon/)).toBeNull();
    });
  });
});