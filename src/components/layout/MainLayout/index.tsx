import * as React from 'react';
import style from './mainlayout.module.scss'
import Logo from '../../../components/ui/Icons/logo';
import cn from 'classnames'
import LeftSideBar from '../LeftSideBar/index'

interface MainLayoutProps {
    children: React.ReactNode;
    customSideBar?: React.ReactElement;
}

export default function MainLayout({ children, customSideBar }: MainLayoutProps) {
    return (
        <div className={style.main}>
            <div className={cn('border-default', 'f-width')}>
                <div className={style.main_inner}>
                    <div className={style.main_text}>
                        <Logo />
                        {customSideBar ? customSideBar : <LeftSideBar />}
                    </div>
                    {children}
                </div>
            </div>

        </div>
    );
}
