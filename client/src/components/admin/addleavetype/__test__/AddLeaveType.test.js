import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import store from '../../../../store';
import AddLeaveType from '../AddLeaveType';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

const MockComponent = () => {
    return (<Router>
        <Provider store={store}>
            <AddLeaveType />
        </Provider>
    </Router>
    )
}
describe("Add Leave Type And Number", () => {
    describe('render test', () => {
        it('Add Leave Type And Number Text Should be render', () => {
            render(<MockComponent />);
            const textElement = screen.getByText(/Add Leave Type And Number/i);
            expect(textElement).toBeInTheDocument();
        });
        it('Add LeaveType should be render', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Add Leave Type/i);
            expect(inputElement).toBeInTheDocument();
        });
        it('Add Number should be render', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Add Number/i);
            expect(inputElement).toBeInTheDocument();
        });
        it('Button Should be render', () => {
            render(<MockComponent />);
            const textElement = screen.getByText(/Submit/i);
            expect(textElement).toBeInTheDocument();
        });
    })
    describe('Event Test', () => {

        it('input Value Should be Expected', async () => {
            render(<MockComponent />)
            const inputOneElement = screen.getByPlaceholderText(/Add Leave Type/i);
            const inputTwoElement = screen.getByPlaceholderText(/Add Number/i);
            fireEvent.change(inputOneElement, { target: { value: 'sick' } })
            fireEvent.change(inputTwoElement, { target: { value: '12' } })
            expect(inputOneElement.value).toBe('sick')
            expect(inputTwoElement.value).toBe('12')
        });
        it('test post request', async () => {
            render(<MockComponent />)
            const inputOneElement = screen.getByPlaceholderText(/Add Leave Type/i);
            const inputTwoElement = screen.getByPlaceholderText(/Add Number/i);
            fireEvent.change(inputOneElement, { target: { value: 'sick' } })
            fireEvent.change(inputTwoElement, { target: { value: '12' } })
            expect(inputOneElement.value).toBe('sick')
            expect(inputTwoElement.value).toBe('12')
        });


    })
})
