import { createTheme } from "@mui/material";

function generatePageTheme (options) {
    const theme = createTheme ({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        },
        typography: {
            h1: {
                fontFamily: "'Poppins', sans-serif",
            },
            h2: {
                fontFamily: "'Poppins', sans-serif",
            },
            h3: {
                fontFamily: "'Poppins', sans-serif",
            },
            h4: {
                fontFamily: "'Poppins', sans-serif",
            },
            h5: {
                fontFamily: "'Poppins', sans-serif",
            },
            h6: {
                fontFamily: "'Poppins', sans-serif",
            },
            body1: {
                fontFamily: "'Poppins', sans-serif",
            },
            body2: {
                fontFamily: "'Poppins', sans-serif",
            },
            button: {
                fontFamily: "'Poppins', sans-serif",
            },
            caption: {
                fontFamily: "'Poppins', sans-serif",
            },
            overline: {
                fontFamily: "'Poppins', sans-serif",
            }
        }
    });

    return theme;
}

export default generatePageTheme;