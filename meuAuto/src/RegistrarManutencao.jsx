import { useState, useEffect } from 'react';
import './RegistrarManutencao.css';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function RegistrarManutencao() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const navigate = useNavigate();
  const [dicaAtual, setDicaAtual] = useState('');

  // Dicas para cada tipo de manutenção
  const dicas = {
    oleo: "💡 Dica: A troca de óleo e filtro deve ser feita a cada 5.000 a 10.000 km rodados, ou a cada 6 meses, o que ocorrer primeiro. Verifique sempre o manual do seu veículo para recomendações específicas.",
    pneu: "💡 Dica: Recomenda-se fazer o rodízio de pneus a cada 10.000 km e verificar a pressão mensalmente. A vida útil média dos pneus é de 40.000 a 60.000 km, dependendo do uso e condições das estradas.",
    lampada: "💡 Dica: Faça uma inspeção visual das lâmpadas mensalmente. Lâmpadas de LED duram mais, mas as halógenas devem ser substituídas quando começarem a perder intensidade. Sempre substitua em pares para manter a iluminação uniforme.",
    suspensao: "💡 Dica: A suspensão deve ser verificada a cada 20.000 km ou anualmente. Sinais de desgaste incluem barulhos ao passar por lombadas e direção instável. Amortecedores geralmente duram entre 40.000 e 80.000 km.",
    motor: "💡 Dica: A revisão completa do motor deve ser feita conforme o manual do veículo, geralmente a cada 10.000 km. Fique atento a ruídos estranhos, consumo excessivo de combustível e perda de potência."
  };

  // Observar mudanças no campo tipo
  const tipoSelecionado = watch("tipo");

  // Atualizar dica quando o tipo mudar
  useEffect(() => {
    if (tipoSelecionado && dicas[tipoSelecionado]) {
      setDicaAtual(dicas[tipoSelecionado]);
    } else {
      setDicaAtual('');
    }
  }, [tipoSelecionado]);

  async function onSubmit(data) {

    const dataSelecionada = new Date(data.data + 'T00:00:00');
    const dataFormatada = `${String(dataSelecionada.getDate()).padStart(2, '0')}/${String(dataSelecionada.getMonth() + 1).padStart(2, '0')}/${dataSelecionada.getFullYear()}`;


    const novaRevisao = {
      marca: data.marca,
      modelo: data.modelo,
      ano: data.ano,
      tipo: data.tipo,
      data: dataFormatada,
      descritivo: data.descritivo ? [data.descritivo] : [],
      local: data.local ? [data.local] : [],
      nomes: [],
      comentarios: [],
      notas: []
    };

    try {
      const resposta = await fetch("http://localhost:3000/revisoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaRevisao),
      });

      if (!resposta.ok) throw new Error("Erro ao registrar manutenção");

      await Swal.fire({
        position: "center",
        icon: "success",
        title: `<span style="font-family: 'Arial'">Manutenção registrada com sucesso!</span>`,
        showConfirmButton: false,
        timer: 2000,
      });

      reset(); // Limpa o formulário
      navigate('/mainpage'); // Redireciona para a página principal
    } catch (erro) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `<span style="font-family: 'Arial'">Erro ao registrar manutenção</span>`,
        text: erro.message,
        showConfirmButton: true,
      });
      console.error("Erro: " + erro.message);
    }
  }

  return (
    <div className="registrar-container">
      <div className="registrar-header">
        <h2>Registrar Manutenção</h2>
        <p>Cadastre uma nova manutenção no histórico</p>
      </div>

      <form className="registrar-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_group">
          <label htmlFor="marca">Marca</label>
          <input 
            type="text" 
            id="marca" 
            placeholder="Ex: Volkswagen"
            {...register("marca", { required: "A marca é obrigatória" })} required
          />
          {errors.marca && <p className="error_message">{errors.marca.message}</p>}
        </div>

        <div className="form_group">
          <label htmlFor="modelo">Modelo</label>
          <input 
            type="text" 
            id="modelo" 
            placeholder="Ex: Gol"
            {...register("modelo", { required: "O modelo é obrigatório" })} required
          />
          {errors.modelo && <p className="error_message">{errors.modelo.message}</p>}
        </div>

        <div className="form_group">
          <label htmlFor="ano">Ano</label>
          <input 
            type="text" 
            id="ano" 
            placeholder="Ex: 2014"
            {...register("ano", { required: "O ano é obrigatório" })} required
          />
          {errors.ano && <p className="error_message">{errors.ano.message}</p>}
        </div>

        <div className="form_group">
          <label htmlFor="data">Data da Manutenção</label>
          <input 
            type="date" 
            id="data" 
            {...register("data", { required: "A data é obrigatória" })}
          />
          {errors.data && <p className="error_message">{errors.data.message}</p>} required
        </div>

        <div className="form_group">
          <label htmlFor="tipo">Tipo de Manutenção</label>
          <select id="tipo" {...register("tipo", { required: "Selecione um tipo de manutenção" })}>
            <option value="">-- Selecione --</option>
            <option value="oleo">Troca de Óleo e Filtro</option>
            <option value="pneu">Troca de Pneu</option>
            <option value="lampada">Verificar Lâmpadas</option>
            <option value="suspensao">Verificar Suspensão</option>
            <option value="motor">Manutenção do Motor</option>
          </select>
          {errors.tipo && <p className="error_message">{errors.tipo.message}</p>}
        </div>

        {dicaAtual && (
          <div className="dica-box">
            {dicaAtual}
          </div>
        )}

        <div className="form_group">
          <label htmlFor="local">Local da Manutenção</label>
          <input 
            type="text" 
            id="local" 
            placeholder="Ex: Oficina Silva"
            {...register("local")} required
          />
        </div>

        <div className="form_group">
          <label htmlFor="descritivo">Descrição</label>
          <textarea 
            id="descritivo" 
            placeholder="Descreva os detalhes da manutenção..."
            rows="4"
            {...register("descritivo")} required
          />
        </div>

        <div className="form-button-container">
          <button type="submit" className="btn-registrar">
            Registrar Manutenção
          </button>
          <button 
            type="button" 
            className="btn-limpar"
            onClick={() => reset()}
          >
            Limpar
          </button>
        </div>
      </form>

      <button 
        className="btn-voltar" 
        onClick={() => navigate('/mainpage')}
      >
        ← Voltar para o Histórico
      </button>
    </div>
  );
}