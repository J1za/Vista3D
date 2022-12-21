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
        <div className={style.second}>
            <div className={style.second_text}>
                <Typography variant='h2' textAlign='center'>What is VISTA?</Typography>
                <Typography variant='h5' className='ffHelvetica'>VISTA is a sophisticated tech business operating in the Fashion Industry by serving multiple Fashion Brand companies via the use of 3D Modelling technologies. The business intends to ameliorate the overall decision-making process of consumers in the Online Shopping environment and the service rendered by these Fashion Brands. VISTA is aiming at solving several problems affecting Fashion E-Commerce, among the latter we discovered that the average return of online purchased clothes surpasses the 30% mark, compared to an 8.89% return once the clothes are purchased directly at the physical store; Customers have shown to lack disposable time when it comes to being physically present in a store; The final alarming problem relates to the pollution created because of unused and unnecessary manufactured clothes. Therefore, VISTA, as a high-tech service company will target the latter problems with the intent of meeting the customers’ needs and wants; to do so, the partners came up with a service that enables the customers to create their own 3D Avatar in real-time to visualize any piece of apparel of the fashion brands partnered with VISTA on themselves.</Typography>
            </div>
            <div className={style.second_video}>
                <video autoPlay data-autoplay loop muted playsInline={true}>
                    <source src={urlVideo} type="video/mp4" />
                </video>
            </div>
            <div className={style.links}>
                <Typography className='descBottom'>“MAKE IT EASY FOR THEM, MAKE IT EASIER FOR YOU”</Typography>
                {mockLinks.map(({ src, href, width, height, id }) => (
                    <SocialLink src={src} href={href} width={width} height={height} key={id} />
                ))}
            </div>
        </div>
    )
}