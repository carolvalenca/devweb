import styled from "styled-components";

const MainContainer = styled.div`
display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
margin-top: 80px;
  width: 55%;
  margin-bottom: 50px;
`
const Header = styled.header`
display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 80px;
`

const HeaderTitle = styled.h1`
font-size: 40px;
`

const Filter = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const AddButton = styled.button`
display: flex;
  align-items: center;
  background-color: #7c5df7;
  color: #fcfdfd;
  font-weight: bold;
  padding: 5px;
  border: 0;
  border-radius: 25px;

  &:hover {
    background-color: #634ac6;
  }
`

const ButtonLabel = styled.p`
margin-left: 10px;
margin-right: 8px;
`

export {MainContainer, ContentContainer, Header, HeaderTitle, Filter, AddButton, ButtonLabel}