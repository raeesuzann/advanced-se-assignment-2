import { useEffect, useState } from "react";

const DEFAULT_THEME = "dark";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }

    return (
      window.localStorage.getItem("theme") ?? DEFAULT_THEME
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  return {
    theme,
    toggleTheme,
  };
}
