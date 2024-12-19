import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteAlert from '../components/DeleteAlert'
import '../css/MyInterests/interests.css'

const MyInterests = () => {

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = 'http://localhost:3000/Login';
    }
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [interestToDelete, setInterestToDelete] = useState(null); // Para armazenar o interesse que será deletado
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('user_id'); // Pega o user_id do localStorage

  const handleDeleteClick = (interest) => {
    setInterestToDelete(interest);  // Define o interesse que será excluído
    setShowDeleteConfirm(true); // Exibe o modal de confirmação
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false); // Fecha o modal sem deletar
  };

  useEffect(() => {
    // Função para buscar os interesses do usuário
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/interests/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
        setInterests(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar interesses');
        setLoading(false);
      }
    };

    fetchInterests();
  }, [userId]);

  // Função para remover um interesse
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/interests/${interestToDelete.NGCO_ID}`);
      setInterests(interests.filter(interest => interest.NGCO_ID !== interestToDelete.NGCO_ID)); // Remove da lista sem precisar recarregar a página
      setShowDeleteConfirm(false); // Fecha o modal de confirmação
    } catch (err) {
      alert('Erro ao remover interesse');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="h1-interestsTitle">Meus interesses</h1>

      {interests.length === 0 ? (
        <p>Você não tem interesses registrados.</p>
      ) : (
        <div className="background-container-interests">
          {interests.map((interest) => (
            <div key={interest.NGCO_ID} className="container-div-myInterests" >

              <div className="container-book-img-myInterests">
                <img src={`http://localhost:8081${interest.LVRO_IMG}`} alt={interest.LVRO_TITULO} className='book-img-myInterests' />
              </div>

              <div className='container-total-details-myInterests'>

                <div className='container-book-titleAndSubtitle-myInterests'>
                  <h1 className='h1-bookTitle-myInterests'>{interest.LVRO_TITULO}</h1>
                  <h2 className='h1-bookSubtitle-myInterests'>{interest.LVRO_ATR}</h2>
                </div>

                <div className='container-book-details-myInterests'>
                  <span className='section-Title'>Autor</span>
                  <span className='section-Description'>{interest.LVRO_ATR}</span>

                  <span className='section-Title'>Editora</span>
                  <span className='section-Description'>{interest.LVRO_EDIT}</span>

                  <span className='section-Title'>Data de lançamento</span>
                  <span className='section-Description'>
                    {new Date(interest.LVRO_DT_LANC).toLocaleDateString('pt-BR')}
                  </span>

                  <span className='section-Title'>Gênero</span>
                  <span className='section-Description'>{interest.LVRO_GEN}</span>

                  <span className='section-Title'>Quantidade de páginas</span>
                  <span className='section-Description'>{interest.LVRO_QNT_PG}</span>

                  <span className='section-Title'>ISBN</span>
                  <span className='section-Description'>{interest.LVRO_ISBN}</span>

                  <p className='section-Title'>Vendido por</p>
                  <p className='section-Description'>{interest.USER_NM}</p>
                </div>
              </div>

              <div className='container-total-moreDetails-myInterests'>
                <div className='container-bookPrice-myInterests'>
                  <h1 className='h1-bookPrice-myInterests'>R${interest.LVRO_PRCO.toFixed(2)}</h1>
                </div>

                <div className='container-book-inNegociation-myInterests'>
                  <p>Em negociação com o vendedor</p>
                  <p className='phoneVendor-myInterests'>{interest.USER_FN}</p>
                </div>

                <div className='container-book-btn-myInterests'>
                  <button onClick={() => handleDeleteClick(interest)}>Não tenho mais interesse</button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmação de deletação */}
      <DeleteAlert
        isOpen={showDeleteConfirm}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
        bookTitle={interestToDelete?.LVRO_TITULO} // Passando o título do livro para o modal
      />
    </div>
  )
}

export default MyInterests