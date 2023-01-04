import style from '../home.module.scss';
import { Typography } from '@mui/material';
import SocialLink from '../SocialLink';
import InstagramI from '../../../assets/images/icons/instagram.png'
import EmailI from '../../../assets/images/icons/email.png'

export function SectionHomeSecond() {
    const urlVideo = 'https://res.cloudinary.com/dnv8xvjrt/video/upload/v1668087939/Final_video_odpzve.mp4';
    const mockLinks = [
        { src: InstagramI.src, href: 'https://www.instagram.com/vista_metahuman/?igshid=YmMyMTA2M2Y%3D', width: 48, height: 48, id: 1 },
        { src: EmailI.src, href: 'mailto:officevista@pec.it', width: 51, height: 46, id: 2 }
    ]
    return (
        <div className={style.second} style={{ position: 'relative' }}>
            <Typography variant='h3' style={{ position: 'absolute', top: 160, left: 330 }} className='ffHelvetica' fontWeight={500}>/ Our Vision</Typography>
            <div className={style.second_text}>
                <Typography variant='h5' className='ffHelvetica'>VISTA is a sophisticated tech business operating in the Fashion Industry by serving multiple Fashion Brand companies via the use of 3D Modelling technologies.</Typography>
                <Typography variant='h5' className='ffHelvetica'>
                    The business intends to ameliorate the overall decision-making process of consumers in the Online Shopping environment and the service rendered by these Fashion Brands.
                </Typography>
                <Typography variant='h5' className='ffHelvetica'>
                    Nicola Enzo Rossi and Giuseppe Bertone, VISTA’s partners, came up with a service that enables the customers to create their own 3D avatars in real-time to visualize any piece of apparel of the fashion brands partnered with VISTA on themselves.
                </Typography>
            </div>
            <div className={style.second_video}>
                <video autoPlay data-autoplay loop muted playsInline={true}>
                    <source src={urlVideo} type="video/mp4" />
                </video>
            </div>
            <div className={style.links} style={{ justifyContent: 'flex-end', position: 'absolute', bottom: 0, right: 45, zIndex: 4 }}>
                {mockLinks.map(({ src, href, width, height, id }) => (
                    <SocialLink src={src} href={href} width={width} height={height} key={id} />
                ))}
            </div>
        </div>
    )
}