import React from 'react';
import './pagination.css'
const Pagination = ({ totalPosts, paginate ,currentPage}: any): React.ReactElement => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPosts; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button data-testid="PaginationBtn" onClick={() => {
              paginate(number);
            }}
              className={number === currentPage ? 'active' : ''}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;