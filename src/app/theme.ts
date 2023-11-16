import {createTheme} from "@mui/material/styles";
import {Theme} from "@mui/system";
import {green} from "@mui/material/colors";

const theme: Theme  = createTheme({
    palette: {

        secondary: {
            main: green[500],
        },
    },
});
export default theme;