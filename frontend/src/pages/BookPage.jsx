import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Book Page/bookPage.css'
import InterestErrorAlert from '../components/InterestErrorAlert.jsx';
import InterestAlert from '../components/InterestAlert.jsx';

const ProductPage = () => {

    const { id } = useParams(); // Pega o ID da URL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);  // Modal de erro
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const handleHaveInterest = async () => {
        try {
            const response = await axios.post('http://localhost:8081/interest', {
                comprador_id: userId,
                livro_id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setIsModalOpen(true); // Mostrar o retorno, pode ser sucesso ou erro
        } catch (error) {

            setIsErrorModalOpen(true);
        }
    };


    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/books/${id}`); // Rota do seu backend
                setBook(response.data); // Guarda os detalhes do livro no estado
                setLoading(false);

            } catch (err) {
                setError('Erro ao buscar os detalhes do livro');
                setLoading(false);
            }
        };

        // Obtém o user_id do localStorage
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId); //
        }

        fetchBookDetails();
    }, [id]);



    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container'>
            <div className='head'>
                <h1 className='h1-BookPageTitle'>Página do livro</h1>
                <a href='/' className='h1-comebackToCatalog'> 🡸 Voltar ao catálogo </a>
            </div>
            <div className='background-container-bookPage'>
                <div className='container-div-bookPage'>

                    {/* DIV FOTO DO LIVRO ↓ */}
                    <div className="bookPhoto-and-btn">
                        <img src={`http://localhost:8081${book.LVRO_IMG}`} alt={book.LVRO_TITULO} className="book_img-bookPage" />

                        <div className='inStock-and-price'>
                            <p className="bookPage-price">
                                <span className='bookPage-currency'>R$</span>{book.LVRO_PRCO.toFixed(2)}
                            </p>
                            <span className='bookPage-inStock'>{book.LVRO_QNT} em estoque</span>
                        </div>
                        <button className="interest-button" onClick={handleHaveInterest}>Tenho interesse!</button>
                    </div>

                    <div className='bookDetails'>
                        <div className='bookDescription-Title-subTitle'>
                            <h1 className='h1-bookTitle'> {book.LVRO_TITULO} </h1>
                            <h2 className='h1-bookSubtitle'> {book.LVRO_ATR} </h2>
                        </div>

                        <br />

                        <div className='bookDescription'>
                            <p>
                                {book.LVRO_DESC}
                            </p>
                        </div>

                        <br />

                        <div className='bookSpecifications'>
                            <h2 className='sectionDetailTitle'>Detalhes</h2>

                            <div className='section'>
                                <span className='section-Title'>Autor</span>
                                <span className='section-Description'>{book.LVRO_ATR}</span>

                                <span className='section-Title'>Editora</span>
                                <span className='section-Description'>{book.LVRO_EDIT}</span>

                                <span className='section-Title'>Data de lançamento</span>
                                <span className='section-Description'>
                                    {new Date(book.LVRO_DT_LANC).toLocaleDateString('pt-BR')}
                                </span>

                                <span className='section-Title'>Gênero</span>
                                <span className='section-Description'>{book.LVRO_GEN}</span>

                                <span className='section-Title'>Quantidade de páginas</span>
                                <span className='section-Description'>{book.LVRO_QNT_PG}</span>

                                <span className='section-Title'>ISBN</span>
                                <span className='section-Description'>{book.LVRO_ISBN}</span>

                                <p className='section-Title'>Vendido por</p>
                                <p className='section-Description'>{book.USER_NM}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InterestAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <InterestErrorAlert
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
            />

        </div>
    );
}

export default ProductPage;