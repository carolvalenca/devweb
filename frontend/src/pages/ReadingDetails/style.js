import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const ReadingDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 55%;
  margin-top: 80px;
`;

const ReadingDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1f213a;
  padding: 20px 25px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ReadingStatus = styled.div`
  display: flex;
  align-items: center;
`;

const BookInfoContainer = styled.div`
  background-color: #1f213a;
  padding: 20px 25px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const GobackButton = styled(Link)`
display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  margin-bottom: 20px;
`

export {
  ReadingDetailsContainer,
  ContentContainer,
  ReadingDetailsHeader,
  ButtonsContainer,
  ReadingStatus,
  BookInfoContainer,
  GobackButton
};
