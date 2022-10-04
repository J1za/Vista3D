import type { NextPage } from 'next'
import Head from 'next/head'
import MainLayout from '../components/layout/MainLayout'
import HomeTemplate from '../templates/HomeTemplate'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>VISTA 3d models</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate />
    </MainLayout>
  )
}

export default Home
