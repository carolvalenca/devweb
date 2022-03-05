import { useEffect, useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import BookInfo from '../../components/BookInfo';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';

const ReadingDetails = () => {
  let params = useParams();
  const [book, setBook] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${params.id}`).then((res) => {
      setBook(res.data[0]);
      console.log(res.data[0]);
    });
  }, []);

  const deleteBook = () => {
    //   console.log(params.id)
    api.delete(`/books/delete/${params.id}`).then((res) => {
      console.log(res)

      navigate('/');
    });
  }

  const markAsFinished = () => {
      console.log('entrouuuu')
    const body = {
        lastPage: book.totalPages,
        finished: true
    }

    api.put(`/books/edit/${params.id}`, body).then((res) => {
      console.log(res)

      setBook(res.data[0])
    });
  }

  const showEditInput = () => {
      setShowInput(!showInput);
  }

  const editBook = () => {
    console.log(parseInt(value));
    const error = validateValue();

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
            lastPage: value,
            finished: value < parseInt(book.totalPages) ? false : true
        }
    
        console.log(body)
    
        api.put(`/books/edit/${params.id}`, body).then((res) => {
          console.log(res)
    
          setBook(res.data[0])
    
          setShowInput(false);
        });
    }
  }

  const validateValue = () => {
    let errorMsg = '';

    console.log(typeof book.totalPages)

    if (value === '') errorMsg = 'Última página lida precisa ser preenchida antes de enviar!'
    else if (value > parseInt(book.totalPages)) errorMsg = 'Última página lida não pode ser maior que o total de páginas do livro!'
    else if (value < 0) errorMsg = 'Última página lida não pode ser negativo!'

    return errorMsg;
  }

//   console.log(formatDate(book.startDate));

  return (
    <div id='reading-details-container'>
      <div className='content-container'>
        <Link to='/' className='goback-button' style={{marginBottom: '20px'}}>
          <MdArrowBackIosNew
            color='#595592'
            size='20px'
            style={{ justifySelf: 'end' }}
          />
          <p>Voltar</p>
        </Link>
        <div className='buttons-container'>
          <div className='status'>
            <p>Status</p>
            <span
              className='tag'
              style={{ backgroundColor: book.finished ? '#1e2d3f' : '#2a2632' }}
            >
              <BsCircleFill
                size='8px'
                color={book.finished ? '#48c9aa' : '#ec9836'}
              />
              <p
                style={{
                  color: book.finished ? '#48c9aa' : '#ec9836',
                  justifySelf: 'center',
                }}
              >
                {book.finished ? 'Terminada' : 'Em andamento'}
              </p>
            </span>
          </div>
          <div className='buttons'>
            {!book.finished && <button
              onClick={showEditInput}
              className='add-button'
              style={{ backgroundColor: '#222641' }}
            >
              <p className='button-label'>Editar</p>
            </button>}
            <button
              onClick={deleteBook}
              className='add-button'
              style={{ backgroundColor: '#ec5756' }}
            >
              <p className='button-label'>Deletar</p>
            </button>
            {!book.finished && <button className='add-button' onClick={markAsFinished}>
              <p className='button-label'>Marcar como lida</p>
            </button>}
          </div>
        </div>
        <div className='book-info-container'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '20px'}}>
                <BookInfo label='Nome do livro' information={book.name} />
                <BookInfo label='Autor(a)' information={book.author} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <BookInfo label='Quantidade de páginas' information={book.totalPages} />
                <BookInfo label='Última página lida' information={book.lastPage} showInput={showInput} value={value} setValue={setValue} editBook={editBook} />
                <BookInfo label='Porcentagem lida' information={`${Math.trunc((100*book.lastPage)/book.totalPages)}%`} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <BookInfo label='Data de início da leitura' information={book.startDate ? formatDate(book.startDate) : ''} />
                <BookInfo label='Data da última atualização' information={book.lastUpdate ? formatDate(book.lastUpdate) : ''} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingDetails;
