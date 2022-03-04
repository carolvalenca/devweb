import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Reading from "../../components/Reading";
import api from "../../services/api";
// import Modal from 'react-modal';

import './style.css';

const Main = () => {
    const [books, setBooks] = useState([]);
    const [booksFiltered, setBooksFiltered] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        api.get('/books').then((res) => {
            setBooks(res.data)
            setBooksFiltered(res.data)
        })
        setBooksFiltered(books)
    }, [])

    const filterBooks = (e) => {
        switch (e.target.value){
            case "terminadas":
                setBooksFiltered(books.filter((book) => book.finished));
                break;
            case "pendentes":
                setBooksFiltered(books.filter((book) => !book.finished));
                break;
            default:
                setBooksFiltered(books);
        }
    }

    return (
        <div id="main-container">
            <button onClick={openModal}>Open Modal</button>
            <Modal show={modalIsOpen} handleClose={closeModal} /> 
            <div className="content-container">
                <header className='header'>
                    <div>
                        <h1>Leituras</h1>
                        <p>Há {books.length} leituras registradas</p>
                    </div>
                    <div className="filter">
                        <select name="select" placeholder='Filtrar por status' onChange={filterBooks} style={{marginRight: '20px'}}>
                            <option value="todas">Todas</option>
                            <option value="terminadas">Terminadas</option>
                            <option value="pendentes">Em andamento</option>
                        </select>
                        <button className='add-button'>
                            <AiFillPlusCircle size='35px'/>
                            <p className="button-label">Adicionar leitura</p>
                        </button>
                    </div>
                </header>
                <section>
                    {booksFiltered.length > 0 && booksFiltered.map((item) => 
                        <Link to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Reading reading={true} book={item} />
                        </Link>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Main;