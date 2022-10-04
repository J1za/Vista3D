import * as React from 'react';
import style from './home.module.scss'
import TextWriter from './TextWriter';
import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import Model3D from './Model3D';

import Logo from '../../components/ui/Icons/logo';

export default function HomeTemplate() {
    return (
        <div className={cn(style.home, 'border-default')}>
            <div className={style.home__inner}>
                <div className={style.home_text}>
                    <Logo />
                    <TextWriter />
                </div>
                <div className={cn('border-default', style.models)}>
                    <div className={style.models_inner}>
                        <Model3D model='Pia_Fit_avg.fbx' />
                        <Model3D model='Omar_fat_avg.fbx' />
                    </div>
                    <Button variant="outlined" style={{ alignSelf: 'center' }}>
                        <Typography variant='h5' fontWeight='700' color='black'>
                            Generate yourself
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
}
