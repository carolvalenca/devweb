import { useEffect, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import BookInfo from '../../components/BookInfo';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StatusTag from '../../components/StatusTag';
import Button from '../../components/Button';
import {
  BookInfoContainer,
  ButtonsContainer,
  ContentContainer,
  GobackButton,
  ReadingDetailsContainer,
  ReadingDetailsHeader,
  ReadingStatus,
} from './style';

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
    api.delete(`/books/delete/${params.id}`).then((res) => {
      console.log(res);

      navigate('/');
    });
  };

  const markAsFinished = () => {
    console.log('entrouuuu');
    const body = {
      lastPage: book.totalPages,
      finished: true,
    };

    api.put(`/books/edit/${params.id}`, body).then((res) => {
      console.log(res);

      setBook(res.data[0]);
    });
  };

  const showEditInput = () => {
    setShowInput(!showInput);
  };

  const editBook = () => {
    console.log(parseInt(value));
    const error = validateValue();

    if (error !== '') {
      toast.error(error, {
        position: 'top-right',
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
        finished: value < parseInt(book.totalPages) ? false : true,
      };

      console.log(body);

      api.put(`/books/edit/${params.id}`, body).then((res) => {
        console.log(res);

        setBook(res.data[0]);

        setShowInput(false);
      });
    }
  };

  const validateValue = () => {
    let errorMsg = '';

    console.log(typeof book.totalPages);

    if (value === '')
      errorMsg = 'Última página lida precisa ser preenchida antes de enviar!';
    else if (value > parseInt(book.totalPages))
      errorMsg =
        'Última página lida não pode ser maior que o total de páginas do livro!';
    else if (value < 0) errorMsg = 'Última página lida não pode ser negativo!';

    return errorMsg;
  };

  return (
    <ReadingDetailsContainer>
      <ContentContainer>
        <GobackButton to='/'>
          <MdArrowBackIosNew
            color='#595592'
            size='20px'
            style={{ justifySelf: 'end' }}
          />
          <p>Voltar</p>
        </GobackButton>
        <ReadingDetailsHeader>
          <ReadingStatus>
            <p style={{ marginRight: '20px' }}>Status</p>
            <StatusTag finished={book.finished} />
          </ReadingStatus>
          <ButtonsContainer>
            {!book.finished && (
              <Button
                label='Editar'
                bgcolor='#222641'
                onClick={showEditInput}
              />
            )}
            <Button label='Deletar' bgcolor='#ec5756' onClick={deleteBook} />
            {!book.finished && (
              <Button label='Marcar como lida' onClick={markAsFinished} />
            )}
          </ButtonsContainer>
        </ReadingDetailsHeader>
        <BookInfoContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <BookInfo label='Nome do livro' information={book.name} />
            <BookInfo label='Autor(a)' information={book.author} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <BookInfo
              label='Quantidade de páginas'
              information={book.totalPages}
            />
            <BookInfo
              label='Última página lida'
              information={book.lastPage}
              showInput={showInput}
              value={value}
              setValue={setValue}
              editBook={editBook}
            />
            <BookInfo
              label='Porcentagem lida'
              information={`${Math.trunc(
                (100 * book.lastPage) / book.totalPages
              )}%`}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <BookInfo
              label='Data de início da leitura'
              information={book.startDate ? formatDate(book.startDate) : ''}
            />
            <BookInfo
              label='Data da última atualização'
              information={book.lastUpdate ? formatDate(book.lastUpdate) : ''}
            />
          </div>
        </BookInfoContainer>
      </ContentContainer>
    </ReadingDetailsContainer>
  );
};

export default ReadingDetails;
