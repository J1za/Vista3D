import * as React from 'react';
import Head from 'next/head'
import MainLayout from '../components/layout/MainLayout'
import ModelGeneratorTemplate from '../templates/ModelGenerator';
import BodySideBar from '../templates/ModelGenerator/BodySideBar';

export interface IAppProps {
}

export default function ModelGenerator(props: IAppProps) {
    return (
        <MainLayout customSideBar={<BodySideBar />}>
            <Head>
                <title>VISTA 3d | model genirator</title>
            </Head>
            <ModelGeneratorTemplate />
        </MainLayout>
    );
}
