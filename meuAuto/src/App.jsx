import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <>
      <div className='fundo'>
        <div className='grupo__logo'>
          <h1>Meu Auto</h1>
          <p>O jeito fácil de cuidar do seu carro.
          </p>
        </div>
        <div className='grupo__dados'>
          <h2>Login</h2>
          <div className='grupo__dados__inserts'>

            <input type="e-mail" placeholder="Seu e-mail aqui" />

            <input type="password" placeholder="Sua senha aqui" maxLength={10} />
            <div>
              <button className='entrar'><Link to="/mainpage">Entrar</Link></button>
              <button className='entrar2'><a href="">Sair</a></button>
            </div>
          </div>
        </div>
        <div>
        </div>
        <p className='assinatura'>Gurizada bem loca, Direitos reservados 2025</p>
      </div>
    </>
  )
}

export default App
