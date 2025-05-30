
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import LoginPage    from './pages/Login';
import MenuPage     from './pages/Menu';
import CartPage     from './pages/Cart';
import Navbar       from './components/navbar';

function ProtectedRoutes({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div style={{ padding: 20 }}>Loading…</div>;
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/menu"
            element={
              <ProtectedRoutes>
                <MenuPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />

          {/* Redirect unknowns */}
          <Route path="*" element={<Navigate to="/menu" />} />
        </Routes>
        </CartProvider>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
