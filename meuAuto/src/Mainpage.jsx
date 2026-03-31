import { useEffect, useState } from 'react'
import './Mainpage.css';
import Titulo from './componentes/Titulo';
import Cardrevisao from './componentes/Cardrevisao'

export default function Mainpage() {
  const [revisoes, setRevisoes] = useState([])

    useEffect(() => {
    async function buscarRevisoes() {
      try {
        const resposta = await fetch("http://localhost:3000/revisoes")
        if (!resposta.ok) throw new Error("Erro ao consultar as revisoes")
        const dados = await resposta.json()
//        console.log(dados)
        setRevisoes(dados.reverse()) 
      } catch (erro) {
        console.log("Erro: ", erro.message)
      }
    }
    buscarRevisoes()
  }, [])

  const listaRevisoes = revisoes.map( revisao => (
    <Cardrevisao key={revisao.id} revisao={revisao} setRevisoes={setRevisoes} />
  ))

  return (
    <>
      <div >
        <header >
          <Titulo />
        </header>
        <main className='meio'>
          <section >
            <h1>Histórico de revisões</h1>
            <div>
              {listaRevisoes}
            </div>
          </section>
        </main>
        <footer>
          <div className='footer'>
            <h3>MeuAuto</h3>
            <img src="rodando2.gif" alt="" />
          </div>
        </footer>
      </div>
    </>
    
  );
}