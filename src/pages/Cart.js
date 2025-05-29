// src/pages/CartPage.jsx
import React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography, Button
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, updateItemQty, removeItem, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Correct total calculation
  const total = items
    .reduce((sum, i) => sum + (i.Price || 0) * i.quantity, 0)
    .toFixed(2);

  const handleSubmit = async () => {
    if (!currentUser || items.length === 0) {
      alert('Please log in and add items before submitting.');
      return;
    }
    const orderData = {
      userId: currentUser.uid,
      items: items.map(i => ({
        id: i.id, name: i.name, price: i.Price, quantity: i.quantity
      })),
      total: parseFloat(total),
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(firestore, 'orders'), orderData);
      clearCart();
      alert('Order submitted successfully!');       // <-- Alert on submission
      navigate('/order-confirmation');
    } catch (err) {
      console.error('Order submission failed:', err);
      alert('Failed to submit order.');
    }
  };

  if (items.length === 0) {
    return <Typography align="center" sx={{ mt: 4 }}>Your cart is empty.</Typography>;
  }

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(i => (
              <TableRow key={i.id}>
                <TableCell>{i.name}</TableCell>
                <TableCell align="right">
                  ${(i.Price || 0).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => {
                    if (i.quantity > 1) updateItemQty(i.id, i.quantity - 1);
                    else removeItem(i.id);
                  }}>
                    <Remove fontSize="small" />
                  </IconButton>
                  {i.quantity}
                  <IconButton size="small" onClick={() => updateItemQty(i.id, i.quantity + 1)}>
                    <Add fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  ${( (i.Price || 0) * i.quantity ).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => removeItem(i.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* Total row */}
            <TableRow>
              <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
              <TableCell align="right"><strong>${total}</strong></TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box textAlign="right" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Order
        </Button>
      </Box>
    </Box>
  );
}
