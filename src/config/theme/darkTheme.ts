import { createTheme, Theme } from "@peersyst/react-native-components";
import { theme } from "./theme";
import { baseTheme, statusTheme } from "./baseTheme";

//Custom light theme colors
export const red = "#C21212";

const gray: Theme["palette"]["gray"] = {
    0: "#262626",
    100: "#3F4246",
    300: "#A7A7A7",
    600: "#dcdcdc",
    900: "#FFFFFF",
};

const overlay: Theme["palette"]["overlay"] = {
    "80%": "#FFFFFFCC",
    "60%": "#FFFFFF99",
    "40%": "#FFFFFF66",
    "20%": "#FFFFFF33",
    "12%": "#FFFFFF1F",
    "8%": "#FFFFFF14",
};
const altOverlay: Theme["palette"]["altOverlay"] = {
    "80%": "#262626CC",
    "60%": "#26262699",
    "40%": "#26262666",
    "20%": "#26262633",
    "12%": "#2626261F",
    "8%": "#26262614",
};

const darkTheme = createTheme({
    ...theme,
    palette: {
        ...baseTheme,
        red,
        status: {
            ...statusTheme,
            error: red,
        },
        mode: "dark",
        background: gray[0],
        text: gray[900],
        gray,
        overlay,
        appbar: gray[0],
        paper: gray[0],
        backdrop: overlay["60%"],
        altOverlay,
    },
});

export default darkTheme;
