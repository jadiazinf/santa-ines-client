import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { App } from './App.jsx'
import { store } from './store';
import './index.css';
import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';
import { DoctorForm } from './components/doctor-form/doctor-form.component.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <DoctorForm />
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
