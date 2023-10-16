import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HalamanHome from './pages/HalamanHome';
import HasilPencarian from './pages/HasilPencarian';
import DetailFilm from './pages/DetailFilm';
import NotFound from './pages/NotFound';
import Trailer from './pages/Trailer';
import Login from './pages/Login'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HalamanHome />} />
          <Route path='/search' element={<HasilPencarian />} />
          <Route path='/detail-film/:movieId' element={<DetailFilm />} />
          <Route path='/trailer/:movieId' element={<Trailer />} />
          <Route path='/login' element={<Login />} />


          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
