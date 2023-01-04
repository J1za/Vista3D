import cn from 'classnames';
import Contactus from '../Form/ContactUs';
import { Typography } from '@mui/material';
import InstagramI from '../../../assets/images/icons/instagram.png'
import LinkedinI from '../../../assets/images/icons/linkedin.png'
import EmailI from '../../../assets/images/icons/email.png'
import SocialLink from '../SocialLink';

import style from '../home.module.scss';

export function SectionHomeFourth() {
    const mockLinks = [
        { src: InstagramI.src, href: 'https://www.instagram.com/official_vista_office/', width: 87, height: 87, id: 1 },
        { src: LinkedinI.src, href: 'https://www.linkedin.com/company/vista-srls/', width: 87, height: 87, id: 2 },
        { src: EmailI.src, href: 'mailto:officevista@pec.it', width: 100, height: 87, id: 3 }
    ]
    return (
        <div className={style.fourth} style={{ position: 'relative' }}>
            <Typography variant='h3' style={{ position: 'absolute', top: 160, left: 330 }} className='ffHelvetica' fontWeight={500}>/ Contact Us</Typography>
            <div className={style.fourth_form}>
                <Contactus />
            </div>
            <div className={style.fourth_links}>
                {mockLinks.map(({ src, href, width, height, id }) => (
                    <SocialLink src={src} href={href} width={width} height={height} key={id} />
                ))}

            </div>
        </div>
    )
}