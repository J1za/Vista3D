import * as React from 'react';
import dynamic from 'next/dynamic'

const UnityGame = dynamic(() => import('./UnityGame'), {
    ssr: false
})
export interface IAppProps {
}

export default function ModelGeneratorTemplate(props: IAppProps) {
    return (
        <div className='h-full'>
            <UnityGame />
        </div>
    );
}
