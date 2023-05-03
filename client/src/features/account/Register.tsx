import { LoadingButton } from "@mui/lab"
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import agent from "../../app/api/agent"


export default function Register() {
    // to register you dont need a redux just use agent to POST request
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if(error.includes('Password')) {
                    setError('password', {message:error})
                }else if(error.includes('Email')) {
                    setError('email', {message: error})
                }else if(error.includes('Username')) {
                    setError('username', {message: error})
                }
            })
        }
    }

    return (
        <Container
            component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: '#00695c' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit((data) => agent.Account.register(data)
                    .then(() => {
                        console.log('Registration successful- you can now login');
                        navigate('/ads');
                    })
                    .catch(error => handleApiErrors(error)))}
                noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    autoFocus
                    {...register('fullName', { required: 'Full Name is required' })}
                    error={!!errors.fullName}      //make it boolean  !!
                    helperText={errors?.fullName?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', {
                        required: 'Email is required' ,
                        pattern: {
                            value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message:'Not a valid email address'
                        }})}
                    error={!!errors.email}      //make it boolean  !!
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern:{
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password} //make it boolean  !!
                    helperText={errors?.password?.message as string}
                />
                <LoadingButton loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: '#00796b',
                        '&:hover': {
                            backgroundColor: '#81b29a',
                            color: '#ffffff'
                        },
                        mt: 3, mb: 2
                    }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}