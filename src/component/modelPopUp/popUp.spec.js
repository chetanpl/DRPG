import {render, screen } from '@testing-library/react';
import React from 'react';
import Popup from './popUp';

const mockedobj = {
    setviewMode: jest.fn(),
    setnewRecord: jest.fn(),
    newRecord: [
        { first_name: 'firstname', last_name: 'lastname', email: 'emaild@email.com' },
        { first_name: 'firstname1', last_name: 'lastname2', email: 'emaild1@email.com' }
    ]
};
const renderedPopUp = (mocked) => {
    return render(<Popup setviewMode={mocked.setviewMode} setnewRecord={mocked.setnewRecord} newRecord={mocked.newRecord} />)
}

describe('render Popup component', () => {
    it('should render popup form', async () => {
        renderedPopUp(mockedobj);
        expect(screen.queryByTestId('poupForm')).toHaveClass('modal-content');
    });
    it('should have first name input item value', async () => {
        renderedPopUp(mockedobj);
        const text= screen.queryByTestId('poupFirstNameTestId').getAttribute('value');
        expect(text).toEqual('firstname');
    });
    it('should have last name input item value', async () => {
        renderedPopUp(mockedobj);
        const text= screen.queryByTestId('poupLastNameTestId').getAttribute('value');
        expect(text).toEqual('lastname');
    });
    it('should have email id input item value', async () => {
        renderedPopUp(mockedobj);
        const text= screen.queryByTestId('poupEmailIdTestId').getAttribute('value');
        expect(text).toEqual('emaild@email.com');
        expect(screen.getByDisplayValue('emaild@email.com')).toBeInTheDocument();
    });
})