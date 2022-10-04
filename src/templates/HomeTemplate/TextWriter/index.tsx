import Typed from 'react-typed';
import cn from 'classnames'

import style from './textwriter.module.scss'

interface ListsArray {
    text: string;
}
interface TextWriterProps {
    lists?: Array<ListsArray>
}

const mockText = [
    { text: 'We provide quality services to our' },
    { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, hic.' },
    { text: 'Mollitia nemo, quibusdam necessitatibus iste voluptatibus optio vero et amet omnis impedit voluptatum odit sint repellendus nostrum quas, commodi eius.' },
    { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, aperiam.' },
    { text: 'Tenetur officia similique in saepe esse culpa, laborDiosam enim.' },
    { text: 'Expedita totam labore eaque dicta velit nemo non ipsam quia fugiat?' },
    { text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    { text: 'Aut aperiam fugiat recusandae dolores dolore?' },
    { text: 'Aut aperiam fugiat recusandae dolores dolore? Dolores, aperiam.' }
]

export default function TextWriter({ lists = mockText }: TextWriterProps) {
    return (
        <ul className={cn('border-default', style.writer)}>
            {lists.map(({ text }, idx) => (
                <li key={idx}>
                    {idx === 0 ?
                        <>
                            {text} <Typed
                                className={style.writer_type}
                                strings={['Clients', 'Valued Clients']}
                                typeSpeed={80}
                                backSpeed={70}
                                loop={true}
                            />
                        </>
                        :
                        text
                    }
                </li>
            ))}
        </ul>
    );
}
