import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";

export const LeftGrid = styled(Grid)`
background-image: 'url(https://source.unsplash.com/random)';
background-repeat: no-repeat;
background-size: cover;
background-position: center;
`

export const RightBox = styled(Box)`
margin: 5em 1em;
display: flex;
flex-direction: column;
align-items: center;
`

export const PValidator = styled('p')`
    display: flex;
    align-items: center;
`

export const ButtonSignIn = styled(Button)`
    background-color: #2da52d;
    margin: 15% 0 5% 0;
    &:hover{
        background-color: #2da52d;
    }
`