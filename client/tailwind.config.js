// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");


export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()];
export const theme = {
    extend: {},
};
export const plugins = [flowbite.plugin()];