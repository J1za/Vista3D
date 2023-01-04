import Head from 'next/head'
import 'src/assets/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ModalProvider } from '../../context/ModalProvider'
import { AuthContextProvider } from '../../context/AuthContext/AuthContext'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../config/theme';

function MyApp({ Component, pageProps }: AppProps) {
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
            <CssBaseline />
            <ToastContainer />
            <Component {...pageProps} />
          </ThemeProvider>
        </ModalProvider>

      </AuthContextProvider>
    </>
  )
}

export default MyApp
