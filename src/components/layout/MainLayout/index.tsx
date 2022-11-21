import * as React from 'react';
import style from './mainlayout.module.scss'
import Logo from '../../../components/ui/Icons/logo';
import cn from 'classnames'
import { Typography } from '@mui/material';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const urlVideo = 'https://res.cloudinary.com/dnv8xvjrt/video/upload/v1668087939/Final_video_odpzve.mp4';
    return (
        <div className={style.main}>
            <div className={cn('f-width')}>
                <div className={style.main_video}>
                    <video autoPlay loop muted playsInline={true}>
                        <source src={urlVideo} type="video/mp4" />
                    </video>
                </div>
                <div className={style.main_inner}>
                    <Logo />
                    {children}
                    <Typography className={style.main_desc} textAlign='center'>“MAKE IT EASY FOR THEM, MAKE IT EASIER FOR YOU”</Typography>
                </div>
            </div>

        </div >
    );
}
