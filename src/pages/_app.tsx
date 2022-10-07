import 'src/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ModalProvider } from '../../context/ModalProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Vista 3d</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tinos:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </>
  )
}

export default MyApp
