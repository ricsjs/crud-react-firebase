import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../../firebaseConnection'
import { doc, collection, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'

function Home() {

  useEffect(() => {
    async function loadTarefas(){
      const unsub = onSnapshot(collection(db, "tarefas"), (snapshot) => {
        let listaTarefas = [];

        snapshot.forEach((doc) => {
          listaTarefas.push({
            id: doc.id,
            nome: doc.nome,
            descricao: doc.descricao,
            prazo: doc.prazo
          })
        })

        setTarefas(listaTarefas);

      })
    }

    loadTarefas();

    listarTarefas();

  }, [])

  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [novaTarefa, setNovaTarefa] = useState({
    nome: '',
    descricao: '',
    prazo: ''
  });

  async function listarTarefas() {
    //para buscar todos as tarefas e listar
    const tarefaRef = collection(db, "tarefas")
    await getDocs(tarefaRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            descricao: doc.data().descricao,
            prazo: doc.data().prazo,
          })
        })

        setTarefas(lista);

      })
      .catch((error) => {
        console.log("Erro ao buscar" + error)
      })
  }

  async function excluirTarefa(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef)
      .then(() => {
        alert("Tarefa deletada com sucesso!" + id);
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id)); 
      })
      .catch((error) => {
        console.log("Erro ao deletar a tarefa" + error);
      });
  }
  

  async function atualizarTarefa(e) {
    e.preventDefault();

    const docRef = doc(db, "tarefas", tarefaSelecionada.id);

    await updateDoc(docRef, {
      nome: novaTarefa.nome,
      descricao: novaTarefa.descricao,
      prazo: novaTarefa.prazo
    })
      .then(() => {
        alert("Tarefa atualizada com sucesso!");
        setTarefaSelecionada(null);
        setNovaTarefa({
          nome: '',
          descricao: '',
          prazo: ''
        });
        listarTarefas();
      })
      .catch((error) => {
        console.log("Erro ao atualizar a tarefa" + error);
      })
  }

  return (
    <div className='container'>

      <h1>Lista de Tarefas</h1>


      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Prazo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas?.map((tarefa) => {
            return (
              <tr key={tarefa.id}>
                <td>{tarefa.nome}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.prazo}</td>
                <td>
                  <button className='acoes' onClick={() => setTarefaSelecionada(tarefa)}>Editar</button>
                  <button className='acoes' onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Formulário para editar tarefa */}
      {tarefaSelecionada && (
        <form onSubmit={atualizarTarefa}>
          <h2>Editar Tarefa</h2>
          <label>
            Nome:
            <input placeholder='Nome' type="text" value={novaTarefa.nome} onChange={(e) => setNovaTarefa({ ...novaTarefa, nome: e.target.value })} />
          </label>
          <label>
            Descrição:
            <input placeholder='Descrição' type="text" value={novaTarefa.descricao} onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })} />
          </label>
          <label>
            Prazo:
            <input placeholder='Prazo' type="text" value={novaTarefa.prazo} onChange={(e) => setNovaTarefa({ ...novaTarefa, prazo: e.target.value })} />
          </label>
          <button type="submit">Atualizar Tarefa</button>
        </form>
      )}

      <Link to="/cadastrarTarefas">Cadastrar nova Tarefa</Link>
    </div>
  )
}

export default Home;