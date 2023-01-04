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
        { src: InstagramI.src, href: 'https://www.instagram.com/official_vista_office/', width: 48, height: 48, id: 1 },
        { src: EmailI.src, href: 'mailto:mail@mail.com', width: 51, height: 46, id: 2 }
    ]
    const mockTeams = [
        { url: user1.src, name: 'NICOLA ENZO ROSSI', position: 'CEO & CFO', id: 1 },
        { url: user2.src, name: 'GIUSEPPE BERTONE', position: 'Product Designer', id: 2 },
        { url: user3.src, name: 'BOHDAN DAVYDIUK', position: 'CTO', id: 3 },
        { url: user4.src, name: 'APOORV KATIYAR', position: 'Product Designer', id: 4 },
    ]
    return (
        <div className={style.third} style={{ position: 'relative' }}>
            <Typography variant='h3' style={{ position: 'absolute', top: 160, left: 330 }} className='ffHelvetica' fontWeight={500}>/ Team</Typography>
            <div className={style.third_team}>
                <div className={style.teams}>
                    {mockTeams.map(({ url, name, position, id }) => (
                        <div key={id} className={style.teams_man}>
                            <Image
                                priority={true}
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
                    The Fashion E-Commerce sector is affected by several problems, among the latter, we discovered that the average return of online purchased clothes surpasses the 30% mark, compared to an 8.89% return once the clothes are purchased directly at the physical store.
                </Typography>
                <Typography variant='h5' className='ffHelvetica'>
                    Customers have shown to lack disposable time when it comes to being physically present in a store; and finally, the last alarming problem relates to the pollution created because of unused and unnecessary manufactured clothes.
                </Typography>
                <Typography variant='h5' className='ffHelvetica'>
                    VISTA addresses these problems and provides for a practical and effective solution for the end user.
                </Typography>
            </div>
            <div className={style.links}>
                <Typography className='descBottom' padding={0}>“MAKE IT EASY FOR THEM, MAKE IT EASIER FOR YOU”</Typography>
                {mockLinks.map(({ src, href, width, height, id }) => (
                    <SocialLink src={src} href={href} width={width} height={height} key={id} />
                ))}
            </div>
        </div>
    )
}