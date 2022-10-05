import * as React from 'react';
import style from './home.module.scss';
import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import Model3D from './Model3D';
import Link from 'next/link';

export default function HomeTemplate() {
    return (
        <div className={cn('border-default', style.models)}>
            <div className={style.models_inner}>
                <Model3D model='Pia_fit_avg.glb' />
                <Model3D model='Omar_fat_avg.glb' />
                <Model3D model='Pia_fit_avg.glb' />
            </div>
            <Link href='model-generator'>
                <Button variant="outlined" style={{ alignSelf: 'center' }}>
                    <Typography variant='h5' fontWeight='700' color='black'>
                        Generate yourself
                    </Typography>
                </Button>
            </Link>
        </div>
    );
}
