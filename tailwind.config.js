module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      heading: ["Georgia,Cambria", "Times New Roman", "Times,serif"],
    },
    extend: {
      backgroundColor: {
        accent_purple: "var(--color-bg-accent-purple)",
        accent_teal: "var(--color-bg-accent-teal)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        black: "var(--color-bg-black)",
      },
      textColor: {
        accent_purple: "var(--color-text-accent-purple)",
        accent_teal: "var(--color-text-accent-teal)",
        accent_blue: "var(--color-text-accent-blue)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
    },
  },
  important: true,
  variants: {
    extend: {},
  },
  plugins: [],
};
