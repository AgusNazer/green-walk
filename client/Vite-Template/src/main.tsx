import ReactDOM from 'react-dom/client';
import { App } from './app';
import dotenv from 'dotenv';
// import { BrowserRouter } from 'react-router-dom'

// Cargar variables de entorno desde el archivo .env
dotenv.config();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  

    <App />

 
);
