import Swal from 'sweetalert2'
import './Cardrevisao.css'
import withReactContent from "sweetalert2-react-content"
import { useForm } from "react-hook-form"
import { useState } from 'react'

const MySwal = withReactContent(Swal)

function Cardrevisao({ revisao, setRevisoes }) {
  const { register, handleSubmit, reset } = useForm()
  const [notificar, setNotificar] = useState(revisao?.notificar || false)

  const nomes = revisao?.nomes || []
  const comentarios = revisao?.comentarios || []
  const notas = revisao?.notas || []

  async function toggleNotificacao() {
    const novoValor = !notificar
    setNotificar(novoValor)
    
    const revisaoAlterada = {
      ...revisao,
      notificar: novoValor
    }

    try {
      const resposta = await fetch(`http://localhost:3000/revisoes/${revisao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(revisaoAlterada),
      })
      
      if (!resposta.ok) throw new Error("Erro ao atualizar notificação")
      
      const respostaLista = await fetch("http://localhost:3000/revisoes")
      const dados = await respostaLista.json()
      setRevisoes(dados.reverse())
    } catch (erro) {
      console.error("Erro: " + erro.message)
    }
  }

  function calcularProximaNotificacao() {
    if (!revisao?.data) return null
    const dataRevisao = new Date(revisao.data.split('/').reverse().join('-'))
    dataRevisao.setMonth(dataRevisao.getMonth() + 6)
    return dataRevisao.toLocaleDateString('pt-BR')
  }

  async function enviarComentario(data) {
    const { comentario } = data

    const revisaoAlterada = {
      ...revisao,
      comentarios: [...comentarios, comentario]
    }

    try {
      const resposta = await fetch(`http://localhost:3000/revisoes/${revisao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(revisaoAlterada),
      })
      if (!resposta.ok) throw new Error("Erro ao incluir comentário da revisão...")

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `<span style="font-family: 'Arial'">Comentário adicionado com sucesso!</span>`,
        showConfirmButton: false,
        timer: 2000,
      })

      // Atualiza lista
      const respostaLista = await fetch("http://localhost:3000/revisoes")
      const dados = await respostaLista.json()
      setRevisoes(dados.reverse())
    } catch (erro) {
      console.error("Erro: " + erro.message)
    }
    reset()   
  }

  function comentarRevisao() {
    MySwal.fire({
      title: <span style={{ fontFamily: "Arial" }}>Comentário: {revisao?.marca} {revisao?.modelo}</span>,
      html: (
        <form onSubmit={handleSubmit(enviarComentario)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <textarea 
            placeholder="Escreva seu comentário sobre esta manutenção..."
            className="swal2-textarea" 
            style={{ width: 300, minHeight: 100, resize: "vertical" }}
            required
            {...register("comentario")}
          />
          <button type="submit" className="swal2-confirm swal2-styled" style={{ marginTop: "20px" }}>
            Enviar Comentário
          </button>
        </form>
      ),
      showConfirmButton: false,
    })
  }



  async function removerRevisao() {
    const resultado = await Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja realmente remover a revisão do ${revisao?.marca} ${revisao?.modelo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c81010',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        const resposta = await fetch(`http://localhost:3000/revisoes/${revisao.id}`, {
          method: "DELETE",
        });

        if (!resposta.ok) throw new Error("Erro ao remover revisão");

        Swal.fire({
          position: "center",
          icon: "success",
          title: '<span style="font-family: \'Arial\'">Revisão removida com sucesso!</span>',
          showConfirmButton: false,
          timer: 2000,
        });

      
        const respostaLista = await fetch("http://localhost:3000/revisoes");
        const dados = await respostaLista.json();
        setRevisoes(dados.reverse());
      } catch (erro) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: '<span style="font-family: \'Arial\'">Erro ao remover revisão</span>',
          text: erro.message,
          showConfirmButton: true,
        });
        console.error("Erro: " + erro.message);
      }
    }
  }

  return (
    <div className='cards'>
      <div>
        {revisao?.tipo && (
          <img 
            src={`./${revisao.tipo.toLowerCase()}.png`} 
            alt={revisao.tipo} 
            className="icone-tipo"
            style={{ width: '80px', height: '80px', marginBottom: '10px' }}
          />
        )}
        <h3>{revisao?.marca} {revisao?.modelo}</h3>
        <h4>{revisao?.marca} - {revisao?.ano}</h4>
        <h4>Tipo: {revisao?.tipo}</h4>
        <h4>Data: {revisao?.data}</h4>
        <h4>Local: {revisao?.local?.join(', ')}</h4>
        <p className="p-sinopse">{revisao?.descritivo?.join(' ')}</p>
        {comentarios.length > 0 && (
          <div className='comentarios-section'>
            <h5>Comentários:</h5>
            {comentarios.map((comentario, index) => (
              <p key={index} className='comentario-item'>• {comentario}</p>
            ))}
          </div>
        )}
        <div className="notificacao-box">
          <label className="notificacao-label">
            <input 
              type="checkbox" 
              checked={notificar}
              onChange={toggleNotificacao}
              className="notificacao-checkbox"
            />
            <span>Notificar manutenção a cada 6 meses</span>
          </label>
          {notificar && (
            <p className="proxima-notificacao">
              📅 Próxima notificação: {calcularProximaNotificacao()}
            </p>
          )}
        </div>
        <div className="card-buttons">
          <button className='btn-avaliar' onClick={comentarRevisao}>Comentar</button>
          <button className='btn-remover' onClick={removerRevisao}>Remover</button>
        </div>
      </div>
    </div>
  )
}

export default Cardrevisao