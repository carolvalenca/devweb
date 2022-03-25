import styled from 'styled-components';

const ReadingContainer = styled.div`
display: grid;
grid-template-columns: 2.2fr 1fr 1fr 1fr 0.2fr;
align-items: center;
background-color: #1f213a;
padding: 20px 25px;
border-radius: 10px;
margin-bottom: 15px;
`

const ReadingPercent = styled.p`
  font-size: 25px;
  font-weight: bold;
  justify-self: center;
`;

export { ReadingContainer, ReadingPercent };
