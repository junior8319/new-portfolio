import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalStyle from './styled/GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactMe from './pages/ContactMe';
import Projects from './pages/Projects';
import Articles from './pages/Articles';
import Administrator from './pages/Administrator';
import StacksProvider from './context/StacksProvider';
import LoginProvider from './context/LoginProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={ <App /> }/>

      <Route path="/contact-me" element={ <ContactMe /> } />

      <Route path="/projects" element={ <Projects /> } />

      <Route path="/articles" element={ <Articles /> } />

      <Route path="/administrator" element={
        <LoginProvider>
          <StacksProvider>
            <Administrator />
          </StacksProvider>
        </LoginProvider>}
      />
      
      <Route path="*" element={ <div>404</div> } />
    </Routes>
  </BrowserRouter>
);
