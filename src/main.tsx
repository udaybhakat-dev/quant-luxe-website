import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" makes every Framer Motion animation on the
        site respect prefers-reduced-motion automatically — transforms
        are disabled and transitions resolve instantly, with no need to
        check the media query in each component. */}
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
