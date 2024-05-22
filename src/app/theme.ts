'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { amber, deepOrange } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f45706'
        },
        secondary: {
            main: '#2c3544'
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;
