import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Reading from "../../components/Reading";
import api from "../../services/api";

import './style.css';

const Main = () => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('todas');
    const [booksFiltered, setBooksFiltered] = useState([])

    useEffect(() => {
        api.get('/books').then((res) => {
            setBooks(res.data)
            setBooksFiltered(res.data)
        })
        setBooksFiltered(books)
    }, [])

    const filterBooks = (e) => {
        setFilter(e.target.value);
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
            <div className="content-container">
                <header className='header'>
                    <div>
                        <h1>Leituras</h1>
                        <p>Há {books.length} leituras registradas</p>
                    </div>
                    <div className="filter">
                        <select name="select" placeholder='Filtrar por status' onChange={filterBooks}>
                            <option value="todas">Todas</option>
                            <option value="terminadas">Terminadas</option>
                            <option value="pendentes">Pendentes</option>
                        </select>
                        <button className='add-button'>
                            <AiFillPlusCircle size='35px'/>
                            <p className="button-label">Adicionar leitura</p>
                        </button>
                    </div>
                </header>
                <section>
                    {booksFiltered.length > 0 && booksFiltered.map((item) => <Reading reading={true} book={item} />)}
                </section>
            </div>
        </div>
    )
}

export default Main;