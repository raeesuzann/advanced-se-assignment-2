import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    it("Should renders heading", () => {
        render(<App />);

        const heading = screen.getByRole('heading')

        expect(heading).toBeInTheDocument();
    });
        it("Should starts local game when clicking start local", async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));

        expect(screen.getByText(/local match/i)).toBeInTheDocument();
    });

});