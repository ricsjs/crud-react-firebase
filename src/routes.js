import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import CadastrarTarefa from './components/pages/CadastrarTarefa';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path='/cadastrarTarefas' element= { <CadastrarTarefa/> }/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;