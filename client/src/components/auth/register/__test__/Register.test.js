import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';
import DatePickers from '../DatePickers';
import { Provider } from "react-redux";
import store from '../../../../store';

const MockComponent = () => {
    return (<Provider store={store}>
        <Register />
    </Provider>
    )
}
describe("Register component test", () => {
    it('Register text test', () => {
        render(<MockComponent />);
        const linkElement = screen.getByText(/Add User/i);
        expect(linkElement).toBeInTheDocument();
    });
    describe("Name Field Test", () => {
        it('Name Should be render', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Name/i);
            expect(inputElement).toBeInTheDocument();
        });
        it('In Login Should be change the Email Value', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Email Address/i);
            fireEvent.change(inputElement, { target: { value: "malismile786@gmail.com" } });
            expect(inputElement.value).toBe("malismile786@gmail.com");
        });
    })
    describe("Password Field Test", () => {
        it('Register Password Should be render', () => {
            render(<MockComponent />);
            const inputElement = screen.queryAllByPlaceholderText(/Password/i)
            expect(inputElement.length).toBe(2)
        });

    })

})