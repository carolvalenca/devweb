import { BsCircleFill } from "react-icons/bs";

import { StatusTagContainer, StatusTagLabel } from "./style";

const StatusTag = ({finished}) => {
    return (
        <StatusTagContainer finished={finished}>
            <BsCircleFill size='8px' color={finished ? "#48c9aa" : "#ec9836"} />
            <StatusTagLabel finished={finished}>{finished ? "Terminada" : "Em andamento"}</StatusTagLabel>
        </StatusTagContainer>
    )
}

export default StatusTag;