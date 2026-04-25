import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Menu from "../../src/components/Menu";

describe("Menu", () => {
    it("Should render the main menu with title", () => {
        render(<Menu />);
        expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
    })

    it("Should renders both game mode button", () => {
        render(<Menu />);
        expect(screen.getByRole("button", {name: /local multiplayer/i })).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /play vs computer/i })).toBeInTheDocument();
    })
})