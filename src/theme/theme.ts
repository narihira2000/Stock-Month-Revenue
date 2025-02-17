'use client';
import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const tailwindTheme = resolveConfig(tailwindConfig);

export const customTheme = createTheme({
  palette: {
    primary: {
      main: tailwindTheme.theme.colors.blue[100],
    },
  },
});
