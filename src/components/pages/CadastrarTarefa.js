import { useState } from 'react'
import { db } from '../../firebaseConnection'
import { collection, addDoc } from 'firebase/firestore'

import './CadastrarTarefa.css'
import { Link } from 'react-router-dom';


function CadastrarTarefa(){

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState('');
    const [idTarefa, setidTarefa] = useState('');

    const [tarefas, setTarefas] = useState([]);

    async function handleAdd(){
        await addDoc(collection(db, "tarefas"), {
            nome: nome,
            descricao: descricao,
            prazo: prazo,
          })
          .then(() => {
            console.log("Dados cadastrados")
            setNome('');
            setDescricao('');
            setPrazo('');
          })
          .catch((error) => {
            console.log("Gerou erro" + error)
          })
    }


    return(
        <div className='container'>
            <h1>Cadastrar nova Tarefa</h1>
            <div className='container'>
                <label>Nome da Tarefa:</label><br/>
                <input placeholder='Digite o nome da tarefa'
                value={nome}
                onChange={ (e) => setNome(e.target.value) }/><br/><br/>
                <label>Descrição:</label><br/>
                <input placeholder='Digite a descrição da tarefa'
                value={descricao}
                onChange={ (e) => setDescricao(e.target.value) }/><br/><br/>
                <label>Prazo:</label><br/>
                <input placeholder='Digite o prazo para finalização da tarefa'
                value={prazo}
                onChange={ (e) => setPrazo(e.target.value)}/><br/><br/>
                <button onClick={handleAdd}>Adicionar</button>
                <Link to='/'>Voltar</Link>
            </div>
        </div>
    )
}

export default CadastrarTarefa;