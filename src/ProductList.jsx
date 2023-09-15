import { Alert, Box, Button, Checkbox, Container, List, ListItemButton, ListItemSecondaryAction, ListItemText, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const ProductList = ({ setLoggedIn }) => {
  
  // STATES
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('token');

  // METHODS
  const getProductList = () => {
    let token = sessionStorage.getItem('token');

    fetch('../productList.json', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(json => {
      setProductList(json.response.products)
    })
  };

  const toggleProductSelection = (product) => {
    if (isSelected(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const isSelected = (product) => {
    return selectedProducts.some((p) => p.id === product.id);
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => total + product.price, 0);
  };

  const handlePlaceOrder = () => {
    const order = {
      username,
      products: selectedProducts
    }

    fetch('../orderResponse.json', {
      // method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      // body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(json => {
      setMessage(json.response.msg);
      setSnackbarOpen(true);
      setSelectedProducts([]);
    })
  };

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expiresIn');
    sessionStorage.removeItem('username');
    setLoggedIn(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // EFFECTS
  useEffect(() => {
    getProductList();
  }, [])

  return (
    <>    
      <Container maxWidth="sm" sx={{ height: '500px'}}>
        <Typography variant="h4" gutterBottom>
          Listado de Productos
        </Typography>
        <Typography variant="h6" gutterBottom>
          Hola {username}!
        </Typography>
        <List>
          {productList.map((product) => (
            <ListItemButton key={product.id} onClick={() => toggleProductSelection(product)}>
              <Checkbox
                edge="start"
                checked={isSelected(product)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={product.name} secondary={`Precio: $${product.price}`} />
              <ListItemSecondaryAction>
                {/* Add any additional actions or buttons here if needed */}
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
        </List>
        <Typography variant="body2">
          Cantidad de productos: {selectedProducts.length}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Precio total: ${calculateTotalPrice().toFixed(2)}
        </Typography>

        <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            disabled={selectedProducts.length === 0}
          >
            Generar Orden
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleLogOut}>
            Cerrar sesión
          </Button>
        </Box>
      </Container>

      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={4000} // Duration to display the Snackbar (in milliseconds)
        onClose={handleSnackbarClose}
        sx={{ margin: '20px' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ProductList