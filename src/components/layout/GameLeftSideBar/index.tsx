import Typed from 'react-typed';
import { Button, Typography } from '@mui/material';
import Logo from '../../ui/Icons/logo';

import style from './leftsidebar.module.scss'

export default function GameLeftSideBar() {
    return (
        <div className={style.menu}>
            <Typography component='div' className={style.menu_logo}><Logo hideText={true} /></Typography>
            <Button className={style.button} style={{ backgroundColor: '#4A54A8', borderRadius: 0 }}><Typography textTransform='uppercase' color='white' fontWeight={400}>info</Typography></Button>
            <Button className={style.button} style={{ backgroundColor: '#42B54E', borderRadius: 0 }}><Typography textTransform='uppercase' color='white'>sliders</Typography></Button>
            <Button className={style.button} style={{ backgroundColor: '#E6506B', borderRadius: 0 }}><Typography textTransform='uppercase' color='white'>clothes</Typography></Button>
            <Button className={style.button} style={{ backgroundColor: '#B837AB', borderRadius: 0 }}><Typography textTransform='uppercase' color='white'>visual</Typography></Button>
        </div>
    );
}