// src/pages/MenuPage.jsx
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';

import FoodCard from '../components/FoodCard';

export default function MenuPage() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestore, 'menuItems'),
      snap => {
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return <Typography align="center">No menu items available.</Typography>;
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <FoodCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
