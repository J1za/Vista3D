import * as React from 'react';
import style from './bodysidebar.module.scss';
import { Box, Typography } from '@mui/material';

const mockDatasBody = [
    { text: 'Features (with Sliders and accurate number):' },
    { text: 'Example:' },
    { text: 'Height = 183 cm' },
    { text: 'Weight = 72 kg' },
    { text: 'Chest Circumference = 100 cm' },
    { text: 'Inseam Right (Legs width) = 86 cm' },
    { text: 'Hip Circumference = 95 cm' },
    { text: 'Waist Circumference = 80 cm' },
]

export default function BodySideBar() {
    return (
        <div className={style.sidebar}>
            <Box component='div' textAlign='center' className={style.body}>
                <Typography variant='h3' fontWeight={700} textTransform='uppercase' style={{ marginBottom: 50 }}>
                    Body
                </Typography>
                {mockDatasBody.map(({ text }, idx) => (
                    <Typography key={idx} fontWeight={700}>
                        {text}
                    </Typography>
                ))}
            </Box>
            <Box component='div' textAlign='center' className='border-default' style={{ padding: 10 }}>
                <Typography textTransform='uppercase'>
                    Clothes (Still not available)
                </Typography>
            </Box>
            <Box component='div' textAlign='center' className='border-default' style={{ padding: 10 }}>
                <Typography>
                    Proceed with these measurements
                </Typography>
            </Box>
        </div>
    );
}
