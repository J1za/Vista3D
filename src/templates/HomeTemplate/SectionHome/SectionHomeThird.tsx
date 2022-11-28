import cn from 'classnames';
import Image from 'next/image';
import { Typography } from '@mui/material';
import SocialLink from '../SocialLink';

//icons
import InstagramI from '../../../assets/images/icons/instagram.png'
import EmailI from '../../../assets/images/icons/email.png'
import userI from '../../../assets/images/userI.png'
import user1 from '../../../assets/images/teams/Nicola Rossi.jpeg'
import user2 from '../../../assets/images/teams/Giuseppe_Bertone.jpg'
import user3 from '../../../assets/images/teams/Bohdan.png'
import user4 from '../../../assets/images/teams/Apoorv_Katiyar.jpeg'

import style from '../home.module.scss';

export function SectionHomeThird() {
    const mockLinks = [
        { src: InstagramI.src, href: 'https://www.instagram.com', width: 48, height: 48, id: 1 },
        { src: EmailI.src, href: 'mailto:mail@mail.com', width: 51, height: 46, id: 2 }
    ]
    const mockTeams = [
        { url: user1.src, name: 'NICOLA ENZO ROSSI', position: 'CEO & CFO', id: 1 },
        { url: user2.src, name: 'GIUSEPPE BERTONE', position: 'Product Designer', id: 2 },
        { url: user3.src, name: 'BOHDAN', position: 'CTO', id: 3 },
        { url: user4.src, name: 'APOORV KATIYAR', position: 'Product Designer', id: 4 },
    ]
    return (
        <div className={style.third}>
            <div className={style.third_team}>
                <Typography variant='h2'>TEAM</Typography>
                <div className={style.teams}>
                    {mockTeams.map(({ url, name, position, id }) => (
                        <div key={id} className={style.teams_man}>
                            <Image
                                src={url}
                                alt="user"
                                objectFit='cover'
                                width={140}
                                height={140}
                            />
                            <Typography variant='h6' fontWeight={700} className={cn('ffHelvetica', style.teams_name)}>{name}</Typography>
                            <Typography variant='h6' className='ffHelvetica' fontStyle='italic'>{position}</Typography>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.third_text}>
                <Typography variant='h5' className='ffHelvetica'>
                    Vista has as its objective the pre-visualization of products in the field of fashion.
                </Typography>
                <Typography variant='h5' className='ffHelvetica'>
                    With our proposal we deem to revolutionise service for the fashion sector, we have incorporated a 3D configurator into the website that allows you to recreate your own features and have an unlimited potential wardrobe where you can choose the best clothes for yourself.
                </Typography>
                <Typography variant='h5' className='ffHelvetica'>
                    That means you no longer have to go to stores to try the clothes to buy them online.
                </Typography>
            </div>
            <div className={style.links}>
                {mockLinks.map(({ src, href, width, height, id }) => (
                    <SocialLink src={src} href={href} width={width} height={height} key={id} />
                ))}
            </div>
        </div>
    )
}