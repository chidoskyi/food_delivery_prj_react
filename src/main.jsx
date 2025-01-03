import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/CartContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <CartProvider>
    <App />
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
)