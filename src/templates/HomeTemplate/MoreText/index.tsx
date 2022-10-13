import { useState } from 'react';
import cn from 'classnames';
import { Typography } from '@mui/material';
import Typed from 'react-typed';

import style from './moretext.module.scss';
import IArrowDownMore from '../../../components/ui/Icons/IArrowDownMore';

export default function MoreText() {
    const [showText, setShowText] = useState<boolean>(false)
    const handleShowText = () => {
        setShowText(!showText);
    }
    return (
        <div className={style.text}>
            <div className={style.text__inner}>
                <p>Vista has as its objective the previsualization of products in the field of fashion. To get to propose a revolutionary service for the sector, we have incorporated a 3D configurator into the website that allows you to recreate your own features and have an unlimited potential wardrobe where you can choose the best clothes for yourself and no longer have to go to trial to buy garments. online.</p>
                <div className={cn(style.text_hidden, {
                    [style.text_show]: showText
                })}>
                    <p>VISTA is a sophisticated tech business operating in the Fashion Industry by serving multiple Fashion Brand companies via the use of 3D Modelling technologies</p>
                </div>
            </div>
            <Typography className={cn(style.more, {
                [style.more_less]: showText
            })} fontWeight={700} component='div' onClick={handleShowText}>
                <IArrowDownMore />
                {!showText &&
                    < Typed
                        strings={['More']}
                        typeSpeed={80}
                        backSpeed={70}
                        onComplete={({ cursor }: any) => cursor.remove()}
                    />
                }
                {showText &&
                    <Typed
                        strings={['Less']}
                        typeSpeed={80}
                        backSpeed={70}
                        onComplete={({ cursor }: any) => cursor.remove()}
                    />
                }
            </Typography>
        </div>
    );
}
