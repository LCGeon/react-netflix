import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';

const Main = React.lazy(() => import('./pages/Main'));
const Detail = React.lazy(() => import('./pages/Detail'));
const Search = React.lazy(() => import('./pages/Search'));

function AppInner() {
  return (
    <BrowserRouter>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:movieId' element={<Detail />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default AppInner;
