import styled from 'styled-components';

const StatusTagContainer = styled.span`
  background-color: ${props => (props.finished ? '#1e2d3f' : '#2a2632')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 15px;
  border-radius: 5px;
  width: 140px;
`;

const StatusTagLabel = styled.p`
color: ${props => (props.finished ? '#48c9aa' : '#ec9836')};
justify-self: center;
margin-left: 5px;
`;

export { StatusTagContainer, StatusTagLabel };
