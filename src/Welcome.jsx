import { Button, Container, Typography } from '@mui/material';

const Welcome = ({ onLoginClick }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Bienvenido a Simple Solutions!
      </Typography>
      <Button variant="contained" color="primary" onClick={onLoginClick}>
        Ingresar
      </Button>
    </Container>
  )
};

export default Welcome;