import { ButtonContainer, ButtonLabel } from "./style";

const Button = ({label, onClick, bgcolor = '#7c5df7'}) => {
    return (
        <ButtonContainer onClick={onClick} style={{backgroundColor: bgcolor}}>
            <ButtonLabel>{label}</ButtonLabel>
        </ButtonContainer>
    )
}

export default Button;