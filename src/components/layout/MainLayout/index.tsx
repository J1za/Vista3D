import * as React from 'react';
import style from './mainlayout.module.scss'
import Logo from '../../../components/ui/Icons/logo';
import cn from 'classnames'
import { Typography } from '@mui/material';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={style.main}>
            <div className={cn('f-width')}>
                <Logo className={style.main_logo} />
                <div className={style.main_inner}>
                    {children}

                </div>
            </div>

        </div >
    );
}
