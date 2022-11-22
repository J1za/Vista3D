import Link from 'next/link';
import Image from 'next/image';

interface SocialLinkI {
    key: number
    href?: string
    src?: string
    width: number
    height: number
    target?: string
}

function SocialLink({ key, href, src, width, height, target }: SocialLinkI) {
    return (
        <Link key={key} href={href ? href : ''}>
            <a target={target ? target : '_blank'}>
                <Image
                    src={src ? src : ''}
                    alt="icon"
                    objectFit='contain'
                    width={width}
                    height={height}
                />
            </a>

        </Link>
    )
}

export default SocialLink