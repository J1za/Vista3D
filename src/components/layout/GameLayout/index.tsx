import * as React from 'react';
import style from './gamelayout.module.scss'
import Logo from '../../ui/Icons/logo';
import IGmail from 'src/assets/images/icons/Gmail_icon.svg'
import Iinsta from 'src/assets/images/icons/Insta_icon.svg'
import cn from 'classnames'
import Link from 'next/link';

interface GameLayoutProps {
    children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
    return (
        <div className={style.main}>
            <div className={cn('f-width')}>
                <Logo className={style.main_logo} />
                {children}
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
