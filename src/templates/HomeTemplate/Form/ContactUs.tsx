import { useState } from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';

function Contactus() {
    let validationForm = object({
        name: string().required('Invalid password').min(2, 'Too Short!').max(25, 'Too Long!'),
        email: string().email('Invalid email').required('Required'),
        text: string().required('Required').min(3, 'Too Short!').max(125, 'Too Long!')
    });
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            text: '',
        },
        validationSchema: validationForm,
        onSubmit: async (values, { resetForm }) => {
            const data = { ...values }
            setLoadingButton(true);
            let config = {
                method: 'post',
                url: '/api/contactus',
                headers: {
                    'Content-Type': 'application/json',
                },
                data
            }
            try {
                const response = await axios(config)
                toast.success('Information Sent', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 1500,
                });
                resetForm();
                setLoadingButton(false);
            } catch (e) {
                toast.error('Something wrong!', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 1500,
                });
                setLoadingButton(false);
            }
        },
    });
    return (
        <Box component='form' onSubmit={formik.handleSubmit} style={{ maxWidth: 576, marginLeft: 50 }}>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <TextField
                        className='contactField'
                        label="Full Name"
                        name="name"
                        type="text"
                        fullWidth
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className='contactField'
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className='contactField'
                        label="Give us your feedback"
                        name="text"
                        type="text"
                        fullWidth
                        value={formik.values.text}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        helperText={formik.touched.text && formik.errors.text}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        style={{ padding: 10, fontSize: 24, background: '#000', borderRadius: 8, minWidth: 243, textTransform: 'inherit' }}
                        variant="contained"
                        color="primary"
                        loading={loadingButton}
                        type="submit"
                        className="ffHelvetica"
                    >
                        Send
                    </LoadingButton>
                </Grid>
            </Grid>


        </Box>
    )
}

export default Contactus