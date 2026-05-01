import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Menu from "../../src/components/Menu";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";

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

    it("Should calls startLocal when clicked", async () => {
        const startLocal = vi.fn();

        render(<Menu startLocal={startLocal} />);
        const button = screen.getByRole('button', { name: /local multiplayer/i });
        const menuEvent = userEvent.setup();
        await menuEvent.click(button)

        expect(startLocal).toHaveBeenCalled();
    });

    it("Should calls startCpu when clicked", async () => {
        const startCpu = vi.fn();

        render(<Menu startCpu={startCpu} />);
        const button = screen.getByRole('button', { name: /play vs computer/i });
        const menuEvent = userEvent.setup();
        await menuEvent.click(button)

        expect(startCpu).toHaveBeenCalled();
    });

    it("Should renders difficulty dropdown", async () => {
        render(<Menu level={5} />);
        
        const select = screen.getByRole('combobox');

        expect(select).toBeInTheDocument()
    });

    it("Should uses level as selected by user", async () => {
        render(<Menu level={3} />);
        
        const select = screen.getByRole('combobox');

        expect(select.value).toBe('3')
    });

    it("Should set levels as user select level", async () => {
        const setLevel = vi.fn();

        render(<Menu setLevel={setLevel} />);
        
        const select = screen.getByRole('combobox');
        const selectLevel = userEvent.setup();
        await selectLevel.selectOptions(select, "4")

        expect(setLevel).toHaveBeenCalledWith(4)
    });

    it("Should show selected difficulty level", async () => {
        render(<Menu level={5} />);

        expect(screen.getByText("Level 5 - Impossible")).toBeInTheDocument()
    });
    
    it("Should toggle theme", async () => {
        const toggleTheme = vi.fn();

        render(<Menu theme='dark' toggleTheme={toggleTheme} />);

        const button = screen.getByRole('button', {name: /day mode/i})
        const buttonEvent = userEvent.setup()
        
        await buttonEvent.click(button)

        expect(toggleTheme).toHaveBeenCalled()
    });

    it("Should saves selected theme to localStorage", async () => {
        const setItem = vi.spyOn(window.localStorage.__proto__, "setItem");

        render(<App />);

        const btn = screen.getByRole("button", {name: /day mode/i});
        const user = userEvent.setup()
        await user.click(btn)

        expect(setItem).toHaveBeenCalledWith("theme", "light");
    });
})