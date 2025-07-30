import {Toaster} from 'sonner';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './presentation/AppRoutes.tsx';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AppRoutes/>
            <Toaster duration={1000} richColors={true} />
        </BrowserRouter>
    </StrictMode>
)
