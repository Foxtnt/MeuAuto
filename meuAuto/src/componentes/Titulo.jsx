import './Titulo.css'
import { Link, useNavigate } from 'react-router-dom'



export default function Titulo() { 
  const navigate = useNavigate()

  return (
    <>
      <header className='titulo topo'>
        <div className='topo__logo'>
            <img src="logo.png" alt="" />
            <div className='texto'>
              <h1>Meu Auto</h1>
              <p>O jeito fácil de cuidar do seu carro.
              </p>
            </div>

        </div>
        <section className='menu'>
            <div className='grupo__botao'>
                <button className='botao' onClick={() => navigate('/')}>sair</button>
            </div>
            <div className='menu__grupo__bag'>
              <ul className='menu__grupo'>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/mainpage'); }}>Home</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/pesquisa'); }}>Pesquisa</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/registrar'); }}>Registrar Manutenção</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/calculadora'); }}>Calculadora</a></li>
              </ul>
            </div>
            <div className='menu__grupo__bag2'>
              <ul className='menu__grupo2'>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/mainpage'); }}>Home</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/pesquisa'); }}>pesquisa</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/registrar'); }}>Registrar Manutenção</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/calculadora'); }}>Calculadora</a></li>
              </ul>
            </div>

        </section>
            <hr />
      </header>


    </>
  )
}

