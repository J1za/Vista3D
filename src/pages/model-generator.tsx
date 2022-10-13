import * as React from 'react';
import Head from 'next/head'
import GameLayout from '../components/layout/GameLayout'
import ModelGeneratorTemplate from '../templates/ModelGenerator';

export interface IAppProps {
}

export default function ModelGenerator(props: IAppProps) {
    return (
        <GameLayout>
            <Head>
                <title>VISTA 3d | model genirator</title>
            </Head>
            <ModelGeneratorTemplate />
        </GameLayout>
    );
}
