
import './App.css';
import TelaLogin from './componentes/login';
import MeuCampeonato from './componentes/MeuCampeonato';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<TelaLogin />} />
        <Route path='/ranking' element={<MeuCampeonato />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
