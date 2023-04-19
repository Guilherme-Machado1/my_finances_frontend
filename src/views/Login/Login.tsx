import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from "react-hook-form";
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import LoginIcon from '@mui/icons-material/Login';

import {ButtonSignIn, LeftGrid, PValidator, RightBox} from './styled'
import axios from 'axios';
import { errorToast, successToast } from '@/helper/toast';

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm({
        defaultValues: {
          email: "",
          password: ""
        }
      });
      const watchAllFields = watch();

      const onSubmit = async(data: {email: string, password: string}) => {
        try {
            const query = await axios.post('http://localhost:3001/signin', {body: data})
            if(query.status === 200){
            successToast(query.data.msg)
            router.push('/dash/dashboard')
          }
          console.log(query)
        } catch (error: any) {
          errorToast(error.response.data.userSignIn.body)
        }
        
      }

      return (
        <>
          <Grid container sx={{ height: '100vh' }}>
            <LeftGrid item xs={false} sm={4} md={7} sx={{backgroundImage: 'url(https://source.unsplash.com/hpjSkU2UYSU)'}} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <RightBox>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '80%' }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    autoFocus
                    {...register("email", {required: true})}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {required: true})}
                  />      

                  <Box>
                    <PValidator>
                      {EmailValidator.validate(watchAllFields.email) ? (
                        <CheckIcon sx={{color: 'green'}}/>
                      ): (
                        <CloseIcon sx={{color: 'red'}}/>
                      )}
                      O email deve ser válido
                    </PValidator>

                    <PValidator>
                    {watchAllFields.password.length > 5 ? (
                      <CheckIcon sx={{color: 'green'}}/>
                    ): (
                      <CloseIcon sx={{color: 'red'}}/>
                    )}
                       A Senha deve ter mais de 6 caracteres
                    </PValidator>
                  </Box>            
                 
                  <ButtonSignIn
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Entrar <LoginIcon />
                  </ButtonSignIn>
                  <Grid container>
                    <Grid item xs>
                      <p style={{textDecoration: 'none', color: '#000'}}>
                        Forgot password?
                      </p>
                    </Grid>
                    <Grid item>
                      <p style={{cursor: 'pointer', textDecoration: 'none', color: '#000'}} onClick={() => router.push('/signup')}>
                        Não tem uma conta? Clique Aqui!
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </RightBox>
            </Grid>
          </Grid>
        </>
      )
    }