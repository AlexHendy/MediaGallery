import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: blue,
      secondary: grey
    },
});