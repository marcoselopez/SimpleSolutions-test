import { Button, Container, Typography } from '@mui/material';

const Welcome = ({ onLoginClick }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome to Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={onLoginClick}>
        Login
      </Button>
    </Container>
  )
};

export default Welcome;