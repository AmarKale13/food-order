// src/components/FoodCard.jsx
import React, { useState } from 'react';
import './FoodCard.css';
import FoodDetailModal from './FoodDetailModal';

export default function FoodCard({ item }) {
  const [open, setOpen] = useState(false);
  let raw = item.description || '';
  raw = raw.replace(/"\s*\+\s*"/g, '\n').replace(/^"|"$/g, '');
  const descLines = raw.split('\n').map(line => line.trim()).filter(line => line);

  return (
    <>
      <div
        className="food-card-front wrap animate pop"
        onClick={() => setOpen(true)}
      >
        <div className="front-sidebar">
          <div className="accent-bar" />

          <h2 className="sidebar-title">{item.name}</h2>

          
          <div className="sidebar-meta">
            {descLines[1] && <span className="meta-item">{descLines[1]}</span>}
            <br />
            {descLines[2] && <span className="meta-item">{descLines[2]}</span>}
          </div>

          <p className="sidebar-price">
            ${(item.Price ?? 0).toFixed(2)}
          </p>
        </div>
        <div
          className="front-image"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        />
      </div>

      {open && (
        <FoodDetailModal
          item={item}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
