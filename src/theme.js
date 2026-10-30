import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Shared typography
const baseTypography = {
  fontFamily: '"Wix Madefor Display", system-ui, "Segoe UI", Arial, sans-serif',
};

// Ban Tao design system
const resortColors = {
  brown: "#766354",
  brownDark: "#554539",
  sand: "#A28B72",
  green: "#34483D",
  cream: "#F7F5EF",
  paper: "#FFFFFF",
  muted: "#89857F",
  border: "#EAE5DD",
};

let themeResort = createTheme({
  palette: {
    primary: {
      main: resortColors.brown,
      dark: resortColors.brownDark,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: resortColors.sand,
      contrastText: "#FFFFFF",
    },
    background: {
      default: resortColors.cream,
      paper: resortColors.paper,
    },
    text: {
      primary: resortColors.green,
      secondary: resortColors.muted,
    },
    divider: resortColors.border,
  },

  typography: {
    ...baseTypography,

    h1: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
    },
    h4: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.8,
    },
    body2: {
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.75rem",
      letterSpacing: "0.08em",
    },
  },

  shape: {
    borderRadius: 0,
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          transition:
            "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        },
        containedPrimary: {
          backgroundColor: resortColors.brown,
          color: "#FFFFFF",

          "&:hover": {
            backgroundColor: resortColors.brownDark,
            boxShadow: "0 7px 18px rgba(75,58,43,0.18)",
          },
        },
        outlinedPrimary: {
          borderColor: resortColors.brown,
          color: resortColors.brown,

          "&:hover": {
            borderColor: resortColors.brownDark,
            backgroundColor: "rgba(118,99,84,0.05)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "0 12px 38px rgba(59,48,38,0.08)",
          border: `1px solid ${resortColors.border}`,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 0,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#FAF9F6",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: resortColors.border,
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: resortColors.sand,
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: resortColors.brown,
            borderWidth: 1,
          },
        },
        input: {
          fontSize: 14,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: resortColors.muted,

          "&.Mui-focused": {
            color: resortColors.brown,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 500,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: resortColors.border,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: resortColors.brown,
          "&:hover": {
            backgroundColor: "rgba(118,99,84,0.07)",
          },
        },
      },
    },
  },
});

themeResort = responsiveFontSizes(themeResort);

// Keep Studio theme unchanged
let themeStudio = createTheme({
  typography: baseTypography,
  palette: {
    primary: { main: "#2f0a45ff" },
    secondary: { main: "#ba68c8" },
    background: { default: "#f6f3fa" },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

themeStudio = responsiveFontSizes(themeStudio);

export { themeResort, themeStudio };
export default themeResort;
