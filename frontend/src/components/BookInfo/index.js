import { BookInfoContainer, BookInfoLabel, BookInformation } from './style';

const BookInfo = ({
  label,
  information,
  showInput,
  value,
  setValue,
  editBook,
}) => {
  return (
    <BookInfoContainer>
      <BookInfoLabel>{label}</BookInfoLabel>
      {showInput ? (
        <div>
          <input
            type='number'
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ marginRight: '2px' }}
          />
          <button onClick={editBook}>
            <p>Ok</p>
          </button>
        </div>
      ) : (
        <BookInformation>{information}</BookInformation>
      )}
    </BookInfoContainer>
  );
};

export default BookInfo;
