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
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {ButtonSignIn, LeftGrid, PValidator, RightBox} from './styled'
import axios from 'axios';
import { successToast, errorToast } from '@/helper/toast';
import { useRouter } from 'next/router'

export default function SignUpView() {
  const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm({
        defaultValues: {
          name: "",
          email: "",
          password: ""
        }
      });
      const watchAllFields = watch();

      const validateEmail = (email: string) => {
        if (!EmailValidator.validate(email)) {
          return false
        }
      };

      const onSubmit = async(data: {name: string, email: string, password: string}) => {
        try {
          console.log(data)
          const query = await axios.post('http://localhost:3001/signup', {body: data})
          if(query.status === 200){
            successToast(query.data.msg)
            router.push('/')
          }
        } catch (error: any) {
          errorToast(error.response.data.userSignUp.body)
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
                  Criar Conta
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    autoComplete="Name"
                    autoFocus
                    
                    {...register("name", {required: true, minLength: 5})}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    autoFocus
                    {...register("email", {required: true, validate: validateEmail})}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {required: true, minLength: 5})}
                  />      

                  <Box>
                  <PValidator>
                      {watchAllFields.name.length > 5 ? (
                        <CheckIcon sx={{color: 'green'}}/>
                      ): (
                        <CloseIcon sx={{color: 'red'}}/>
                      )}
                      O Nome deve ter mais de 5 caracteres
                    </PValidator>

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
                    Criar Conta
                  </ButtonSignIn>
                  <Grid container>
                    <Grid item>
                      <Link onClick={() => router.push('/')} sx={{cursor: 'pointer', textDecoration: 'none', color: 'black'}}variant="body2">
                        {"Já tem uma conta? Clique aqui"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </RightBox>
            </Grid>
          </Grid>
        </>
      )
    }