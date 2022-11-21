import Head from 'next/head'
import MainLayout from '../components/layout/MainLayout'
import AuthTemplate from '../templates/AuthTemplate'

function Auth() {

    return (
        <MainLayout>
            <Head>
                <title>VISTA 3d models | Auth</title>
            </Head>
            <AuthTemplate />
        </MainLayout>
    )
}

export default Auth