import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#388e3c',
        },
        secondary: {
            main: '#4caf50',
        },
    },
});

export default theme;