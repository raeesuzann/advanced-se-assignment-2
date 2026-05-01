import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
    it("Should renders heading", () => {
        render(<App />);

        const heading = screen.getByRole('heading')

        expect(heading).toBeInTheDocument();
    });
});