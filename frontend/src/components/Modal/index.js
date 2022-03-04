import './style.css';

const Modal = ({ handleClose, show, children, labelButton }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Adicionar leitura</h2>
        <button type="button" onClick={handleClose} style={{right: 0}}>
          Adicionar
        </button>
      </section>
    </div>
  );
};

export default Modal;