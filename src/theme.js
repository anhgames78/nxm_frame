import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance. Instagram Color Palette
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0040ff',
        },
        secondary: {
            main: '#ED088E',
        },
        info: {
            main: '#B500FF',
        },
        warning: {
            main: '#FFB900',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;