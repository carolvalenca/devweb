import { MdArrowForwardIos } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

import './style.css'
import { formatDate } from "../../utils/formatDate";

const Reading = ({book}) => {
    return (
        <div id='reading-container'>
            <h3>{book.name}</h3>
            <p>Desde {formatDate(book.startDate)}</p>
            <p style={{fontSize: '25px', fontWeight: 'bold', justifySelf: 'center'}}>{`${Math.trunc((100*book.lastPage)/book.totalPages)}%`}</p>
            <span className="tag" style={{backgroundColor: book.finished ? "#1e2d3f" : "#2a2632"}}>
                <BsCircleFill size='8px' color={book.finished ? "#48c9aa" : "#ec9836"} />
                <p style={{color: book.finished ? "#48c9aa" : "#ec9836", justifySelf: 'center'}}>{book.finished ? "Terminada" : "Em andamento"}</p>
            </span>
            <MdArrowForwardIos color="#595592" size='20px' style={{justifySelf: 'end'}}/>
        </div>
    )
}

export default Reading;