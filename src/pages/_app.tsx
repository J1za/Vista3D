import 'src/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ModalProvider } from '../../context/ModalProvider'
import { AuthContextProvider } from '../../context/AuthContext/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps, router }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: 'Belleza',
    },
  });
  return (
    <>
      <Head>
        <title>Vista 3d</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;500;700&family=Belleza&family=Italiana&display=swap" rel="stylesheet" />
      </Head>
      <AuthContextProvider>
        <ModalProvider>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <Component {...pageProps} />
              <ToastContainer />
            </StyledEngineProvider>
          </ThemeProvider>
        </ModalProvider>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
