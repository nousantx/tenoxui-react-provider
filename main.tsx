// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import { TenoxUIProvider } from './src/contexts/TenoxUIProvider'
import './src/css/index.css'

createRoot(document.getElementById('root')!).render(
  <TenoxUIProvider>
    <Routes />
  </TenoxUIProvider>
)
