import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from "@mui/material";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";
import { signinUser } from "./accountSlice";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from "@mui/lab";


export default function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signinUser(data));
            navigate('/ads');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container
            component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: '#00695c' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    autoFocus
                    {...register('email', { required: 'email is required' })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
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
                    LOGIN
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/register">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}