// src/components/FoodDetailModal.jsx
import React from 'react';
import { Modal, Box, Button, IconButton, Typography } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import './FoodCard.css';

export default function FoodDetailModal({ item, open, onClose }) {
  const { addItem, updateItemQty, removeItem, items } = useCart();
  const cartEntry = items.find(i => i.id === item.id);
  const qty = cartEntry?.quantity || 0;

  const sidebarBg = 
    'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&auto=format&fit=crop&q=60';

  let raw = item.description || '';
  raw = raw.replace(/"\s*\+\s*"/g, '\n').replace(/^"|"$/g, '');
  const descLines = raw.split('\n').map(line => line.trim()).filter(Boolean);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
      }}>
        <div className="wrap animate pop open">
          <div className="overlay">
            <div className="overlay-content animate slide-left delay-2">
              <h1 className="animate slide-left pop delay-4" style={{ fontSize: '1.5em', color: 'white' }}>
                {item.name}
              </h1>
              <p className="animate slide-left pop delay-5" style={{ fontSize: '1em', color: 'white' }}>
                Price: <em>${(item.Price ?? 0).toFixed(2)}</em>
              </p>
            </div>

            <div
              className="image-content animate slide delay-5"
              style={{ backgroundImage: `url(${sidebarBg})` }}
            />

            <div className="dots animate">
              <div className="dot animate slide-up delay-6" style={{ background: '#ff5722' }} />
              <div className="dot animate slide-up delay-7" style={{ background: '#ff5722' }} />
              <div className="dot animate slide-up delay-8" style={{ background: '#ff5722' }} />
            </div>
          </div>

          <div className="text">
            <Box
              component="img"
              src={item.imageUrl}
              alt={item.name}
              sx={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2
              }}
            />

            {descLines.map((line, idx) => (
              <Typography
                key={idx}
                paragraph
                sx={{ fontSize: '0.9rem', lineHeight: 1.4, mb: 1 }}
              >
                {line}
              </Typography>
            ))}

            {qty === 0 ? (
              <Box mt={2} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addItem(item, 1)}
                >
                  Add to Cart
                </Button>
              </Box>
            ) : (
              <Box mt={2} display="flex" justifyContent="center" alignItems="center" gap={1}>
                <IconButton
                  size="small"
                  onClick={() => {
                    if (qty > 1) updateItemQty(item.id, qty - 1);
                    else removeItem(item.id);
                  }}
                >
                  –
                </IconButton>
                <Typography>{qty}</Typography>
                <IconButton
                  size="small"
                  onClick={() => updateItemQty(item.id, qty + 1)}
                >
                  +
                </IconButton>
              </Box>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
