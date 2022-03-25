import './style.css';
import Input from '../Input';
import { RiCloseCircleLine } from "react-icons/ri";
import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../Button';

const Modal = ({ handleClose, show, children, labelButton }) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();

  const saveBook = () => {
    const error = validateValues();
    
    if (error !== '') {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     });
    } else {
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
  }

  const validateValues = () => {
    let error = '';

    if (name.trim().length === 0) {
      error = 'Necessário incluir o nome do livro!';
    } else if (author.trim().length === 0) {
      error = 'Necessário incluir o autor do livro!';
    } else if (pages <= 0) {
      error = 'Número de páginas do livro precisa ser maior que zero!';
    }

    return error;
  }

  return (
    <div className={showHideClassName} id='modal-container'>
      <section className="modal-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px'}}>
          <h2>Adicionar leitura</h2>
          <button style={{background: 'none', border: 'none'}} onClick={handleClose}>
            <RiCloseCircleLine color='white' size={25}/>
          </button>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Input label='Nome do livro' value={name} setValue={(e) => setName(e.target.value)} />
          <Input label='Autor(a)' value={author} setValue={(e) => setAuthor(e.target.value)} />
          <Input label='Quantidade de páginas' type='number' value={pages} setValue={(e) => setPages(e.target.value)} />
        </div>
        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
          <Button label='Adicionar' onClick={saveBook} />
        </div>
      </section>
    </div>
  );
};

export default Modal;