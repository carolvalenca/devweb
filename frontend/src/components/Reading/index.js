import { MdArrowForwardIos } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

import { formatDate } from "../../utils/formatDate";
import { ReadingContainer, ReadingPercent } from "./style";
import StatusTag from "../StatusTag";

const Reading = ({book}) => {
    const percent = Math.trunc((100*book.lastPage)/book.totalPages);

    return (
        <ReadingContainer>
            <h3>{book.name}</h3>
            <p>Desde {formatDate(book.startDate)}</p>
            <ReadingPercent>{`${percent}%`}</ReadingPercent>
            <StatusTag finished={book.finished} />
            <MdArrowForwardIos color="#595592" size='20px' style={{justifySelf: 'end'}}/>
        </ReadingContainer>
    )
}

export default Reading;