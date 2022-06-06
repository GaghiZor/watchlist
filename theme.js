import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  breakpoints: createBreakpoints({
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  }),
};

const theme = extendTheme({ config });

export default theme;
