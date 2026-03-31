import { useEffect, useState } from 'react'
import './Pesquisa.css';
import Titulo from './componentes/Titulo';
import Cardrevisao from './componentes/Cardrevisao'

export default function Pesquisa() {
  const [revisoes, setRevisoes] = useState([])
  const [revisoesFiltradas, setRevisoesFiltradas] = useState([])
  const [termoPesquisa, setTermoPesquisa] = useState('')

  useEffect(() => {
    async function buscarRevisoes() {
      try {
        const resposta = await fetch("http://localhost:3000/revisoes")
        if (!resposta.ok) throw new Error("Erro ao consultar as revisoes")
        const dados = await resposta.json()
        setRevisoes(dados.reverse())
        setRevisoesFiltradas(dados.reverse()) 
      } catch (erro) {
        console.log("Erro: ", erro.message)
      }
    }
    buscarRevisoes()
  }, [])

  function pesquisar(evento) {
    const termo = evento.target.value
    setTermoPesquisa(termo)
    
    if (termo === '') {
      setRevisoesFiltradas(revisoes)
    } else {
      const termoLower = termo.toLowerCase()
      const resultados = revisoes.filter(revisao => 
        revisao.marca?.toLowerCase().includes(termoLower) ||
        revisao.modelo?.toLowerCase().includes(termoLower) ||
        revisao.tipo?.toLowerCase().includes(termoLower)
      )
      setRevisoesFiltradas(resultados)
    }
  }

  function limparPesquisa() {
    setTermoPesquisa('')
    setRevisoesFiltradas(revisoes)
  }

  const listaRevisoes = revisoesFiltradas.map( revisao => (
    <Cardrevisao key={revisao.id} revisao={revisao} setRevisoes={setRevisoes} />
  ))

  return (
    <>
      <div>
        <header>
          <Titulo />
        </header>
        <main className='pesquisa-container'>
          <section className='pesquisa-section'>
            <div className='pesquisa-header'>
              <h1>Pesquisar Manutenções</h1>
              <p>Busque por marca, modelo ou tipo de manutenção</p>
            </div>

            <div className='pesquisa-campo'>
              <input 
                type="text" 
                placeholder="Digite marca, modelo ou tipo..."
                value={termoPesquisa}
                onChange={pesquisar}
                className='input-pesquisa'
              />
              {termoPesquisa && (
                <button className='btn-limpar-campo' onClick={limparPesquisa}>
                  ✕
                </button>
              )}
            </div>

            {termoPesquisa && (
              <p className='resultado-pesquisa'>
                {revisoesFiltradas.length} resultado(s) encontrado(s) para "<strong>{termoPesquisa}</strong>"
              </p>
            )}

            <div className='pesquisa-resultados'>
              {listaRevisoes.length > 0 ? listaRevisoes : (
                <div className='sem-resultados'>
                  <p>🔍 Nenhuma manutenção encontrada.</p>
                  {termoPesquisa && <p>Tente pesquisar com outros termos.</p>}
                </div>
              )}
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
