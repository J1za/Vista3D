import * as React from 'react';
import style from './mainlayout.module.scss'

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={style.main}>
            {children}
        </div>
    );
}
