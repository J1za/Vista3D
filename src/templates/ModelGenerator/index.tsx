import * as React from 'react';
import UnityGame from './UnityGame';

export interface IAppProps {
}

export default function ModelGeneratorTemplate(props: IAppProps) {
    return (
        <div className='h-full'>
            <UnityGame />
        </div>
    );
}
