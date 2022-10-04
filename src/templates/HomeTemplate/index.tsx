import * as React from 'react';
import style from './home.module.scss'
import Logo from '../../components/ui/Icons/logo';


export default function HomeTemplate() {
    return (
        <div className={style.home}>
            <div>
                <Logo />
            </div>
        </div>
    );
}
