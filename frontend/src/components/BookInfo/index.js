import { useState } from 'react';

import './style.css';

const BookInfo = ({ label, information, showInput, value, setValue, editBook }) => {
  return (
    <div id='book-info-container'>
      <p style={{ color: '#5a5c75', marginBottom: '5px', fontSize: '16px' }}>
        {label}
      </p>
      {showInput ? (
        <div>
            <input
            type='number'
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{marginRight: '2px'}}
            />
            <button onClick={editBook}>
            <p>Ok</p>
            </button>
        </div>
      ) : (
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{information}</p>
      )}
    </div>
  );
};

export default BookInfo;
