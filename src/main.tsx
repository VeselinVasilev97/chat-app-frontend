// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './Providers/AuthProvider.tsx'
import { ModalProvider } from './Providers/ModalContextProvider/ModalContext.tsx'
// import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  // </StrictMode>,
)
