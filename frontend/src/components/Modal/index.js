import './style.css';
import Input from '../Input';
import { RiCloseCircleLine } from "react-icons/ri";
import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Modal = ({ handleClose, show, children, labelButton }) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();

  const saveBook = () => {
    const body = {
      name,
      author,
      finished: false,
      lastPage: 0,
      totalPages: pages,
    }

    api.post('/books/save', body).then((res) => {
      console.log(res)
      const book = res.data;
      handleClose();
      navigate(`/details/${book.id}`)
    });
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h2>Adicionar leitura</h2>
          <button style={{background: 'none', border: 'none'}} onClick={handleClose}>
            <RiCloseCircleLine color='white' size={25}/>
          </button>
        </div>
        <Input label='Nome do livro' value={name} setValue={(e) => setName(e.target.value)} />
        <Input label='Autor(a)' value={author} setValue={(e) => setAuthor(e.target.value)} />
        <Input label='Quantidade de páginas' type='number' value={pages} setValue={(e) => setPages(e.target.value)} />
        <button type="button" onClick={saveBook}>
          Adicionar
        </button>
      </section>
    </div>
  );
};

export default Modal;