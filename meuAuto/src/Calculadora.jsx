import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calculadora.css';

function Calculadora() {
  const [kmIni, setKmIni] = useState('');
  const [kmFinal, setKmFinal] = useState('');
  const [litros, setLitros] = useState('');
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const histSalvo = JSON.parse(localStorage.getItem('historicoConsumo')) || [];
    setHistorico(histSalvo);
  }, []);

  // calcular e salvar
  const handleSubmit = (e) => {
    e.preventDefault();
    const kmIniNum = parseFloat(kmIni);
    const kmFinalNum = parseFloat(kmFinal);
    const litrosNum = parseFloat(litros);

    const kmPercorrida = kmFinalNum - kmIniNum;
    if (kmPercorrida <= 0 || litrosNum <= 0 || isNaN(kmPercorrida) || isNaN(litrosNum)) {
      alert('Valor inválido! KM final deve ser maior que o inicial, e litros maior que 0.');
      return;
    }

    const consumo = (kmPercorrida / litrosNum).toFixed(2);
    const novoItem = {
      id: Date.now(),
      kmIni: kmIniNum,
      kmFinal: kmFinalNum,
      litros: litrosNum,
      kmPercorrida,
      consumo,
    };

    const novoHist = [...historico, novoItem];
    setHistorico(novoHist);
    localStorage.setItem('historicoConsumo', JSON.stringify(novoHist));

    // limpa
    setKmIni('');
    setKmFinal('');
    setLitros('');
  };

  // remover do historico
  const removerItem = (id) => {
    const novoHist = historico.filter((item) => item.id !== id);
    setHistorico(novoHist);
    localStorage.setItem('historicoConsumo', JSON.stringify(novoHist));
  };

  return (
    <div className="calculadora-container">
      <div className="calculadora-header">
        <h2>Calculadora de Consumo de Combustível</h2>
        <p>Insira os dados para calcular a média de consumo (km/l).</p>
      </div>

      <form onSubmit={handleSubmit} className="calculadora-form">
        <div className="form-group">
          <label>KM Inicial:</label>
          <input
            type="number"
            value={kmIni}
            onChange={(e) => setKmIni(e.target.value)}
            placeholder="exemplo: 10000"
            required
          />
        </div>
        <div className="form-group">
          <label>KM Final:</label>
          <input
            type="number"
            value={kmFinal}
            onChange={(e) => setKmFinal(e.target.value)}
            placeholder="exemplo: 50000"
            required
          />
        </div>
        <div className="form-group">
          <label>Litros Abastecidos:</label>
          <input
            type="number"
            step="0.01"
            value={litros}
            onChange={(e) => setLitros(e.target.value)}
            placeholder="Ex: 40"
            required
          />
        </div>
        <div className="form-button-container">
          <button type="submit" className="btn-calcular">Calcular e Salvar</button>
        </div>
      </form>

      <div className="historico-section">
        <h3 className="historico-header">Histórico de Consumos</h3>
        {historico.length === 0 ? (
          <p className="historico-vazio">Nenhum cálculo salvo.</p>
        ) : (
          <table className="historico-table">
            <thead>
              <tr>
                <th>KM Inicial</th>
                <th>KM Final</th>
                <th>Litros</th>
                <th>KM Percorrida</th>
                <th>Consumo (km/l)</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item) => (
                <tr key={item.id}>
                  <td>{item.kmIni}</td>
                  <td>{item.kmFinal}</td>
                  <td>{item.litros}</td>
                  <td>{item.kmPercorrida}</td>
                  <td>{item.consumo}</td>
                  <td>
                    <button className="btn-remover" onClick={() => removerItem(item.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="btn-voltar" onClick={() => navigate('/Mainpage')}>Voltar para Home</button>
      </div>
    </div>
  );
}

export default Calculadora;