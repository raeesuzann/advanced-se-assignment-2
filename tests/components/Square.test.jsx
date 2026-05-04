import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Square from "../../src/components/Square";

describe("Square", () => {
    it("Should display square text", () => {
        render(<Square />);

        const squares = screen.getByRole("button", {name: /square/i});

        expect(squares).toBeInTheDocument();
    });
})