import * as React from 'react';
import style from './mainlayout.module.scss'
import Logo from '../../../components/ui/Icons/logo';
import IGmail from 'src/assets/images/icons/Gmail_icon.svg'
import Iinsta from 'src/assets/images/icons/Insta_icon.svg'
import cn from 'classnames'
import Link from 'next/link';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

interface MainLayoutProps {
    children: React.ReactNode;
    customSideBar?: React.ReactElement;
}

export default function MainLayout({ children, customSideBar }: MainLayoutProps) {
    const { isDesktopSmall } = useWindowDimensions();
    return (
        <div className={style.main}>
            <div className={cn('f-width')}>
                <div className={style.main_inner}>
                    <div className={style.main_text}>
                        {!isDesktopSmall && <Logo />}
                        {customSideBar && customSideBar}
                    </div>
                    {children}
                </div>
                <div className={style.main_links}>
                    <Link href='https://www.instagram.com/'>
                        <a target="_blank">
                            <Iinsta width={38} height={40} />
                        </a>
                    </Link>
                    <Link href='mailto:mail@mail.com'>
                        <a>
                            <IGmail width={42} height={42} />
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    );
}
