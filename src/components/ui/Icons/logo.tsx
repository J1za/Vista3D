import * as React from 'react';
import style from './icons.module.scss'
import Link from 'next/link';
import cn from 'classnames';

import ILogo from 'src/assets/images/VISTA-LOGO.svg'

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <Link href='/' passHref>
            <a className={cn(style.logo, className)}>
                <ILogo />
                <p>Vista</p>
            </a>
        </Link>
    );
}
