import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { api } from './features/api/api.js'
createRoot(document.getElementById('root')).render( 
<ApiProvider api={api}>
    <App />
</ApiProvider> 
)
