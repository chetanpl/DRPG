import Pagination from './pagination'
import { render, fireEvent, screen } from '@testing-library/react';
import React, { useState } from 'react';
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
  }));
describe('Pagination', () => {
    let useMyState=useState.mockImplementation(jest.fn().mockReturnValue([0, jest.fn()]));
    const renderedPagination=(totalposts,paginate,currentPage )=>{
        return render(<Pagination totalPosts={totalposts}  paginate={paginate} currentPage={currentPage}/>)
    }
    it.only('should match active class on button click event', async () => {
      renderedPagination(1, useMyState,1);
       const button = screen.queryByTestId('PaginationBtn');
        fireEvent.click(button);
        expect(screen.getByTestId('PaginationBtn')).toHaveClass('active')
    });
    it.only('should return 12 number of list', async () => {
        renderedPagination(12, useMyState,1);
          expect(screen.getAllByTestId('PaginationBtn')).toHaveLength(12)
      });
      it.only('should not return any number of list', async () => {
        renderedPagination(0, useMyState,1);
          expect(screen.queryByTestId('PaginationBtn')).not.toBeInTheDocument()
      });
      it.only('c not return any number of list', async () => {
        renderedPagination(1, useMyState,0);
        expect(screen.getAllByTestId('PaginationBtn')).toHaveLength(1)
      });
})