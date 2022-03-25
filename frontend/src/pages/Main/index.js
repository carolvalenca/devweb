import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import Reading from '../../components/Reading';
import api from '../../services/api';
import {
  AddButton,
  ButtonLabel,
  ContentContainer,
  Filter,
  Header,
  HeaderTitle,
  MainContainer,
} from './style';

const Main = () => {
  const [books, setBooks] = useState([]);
  const [booksFiltered, setBooksFiltered] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    api.get('/books').then((res) => {
      setBooks(res.data);
      setBooksFiltered(res.data);
    });
  }, []);

  const filterBooks = (e) => {
    switch (e.target.value) {
      case 'terminadas':
        setBooksFiltered(books.filter((book) => book.finished));
        break;
      case 'pendentes':
        setBooksFiltered(books.filter((book) => !book.finished));
        break;
      default:
        setBooksFiltered(books);
    }
  };

  return (
    <MainContainer>
      <Modal show={modalIsOpen} handleClose={closeModal} />
      <ContentContainer>
        <Header>
          <div>
            <HeaderTitle>Leituras</HeaderTitle>
            <p>Há {books.length} leituras registradas</p>
          </div>
          <Filter>
            <select
              name='select'
              placeholder='Filtrar por status'
              onChange={filterBooks}
              style={{ marginRight: '20px' }}
            >
              <option value='todas'>Todas</option>
              <option value='terminadas'>Terminadas</option>
              <option value='pendentes'>Em andamento</option>
            </select>
            <AddButton onClick={openModal}>
              <AiFillPlusCircle size='35px' />
              <ButtonLabel>Adicionar leitura</ButtonLabel>
            </AddButton>
          </Filter>
        </Header>
        <section>
          {booksFiltered.length > 0 &&
            booksFiltered.map((item) => (
              <Link
                to={`/details/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Reading reading={true} book={item} />
              </Link>
            ))}
        </section>
      </ContentContainer>
    </MainContainer>
  );
};

export default Main;
