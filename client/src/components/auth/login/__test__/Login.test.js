import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { Provider } from "react-redux";
import store from '../../../../store';

const MockComponent = () => {
    return (<Provider store={store}>
        <Login />
    </Provider>
    )
}
describe("Login component test", () => {
    it('Login text test', () => {
        render(<MockComponent />);
        const linkElement = screen.getByText(/Sign Into Your Account/i);
        expect(linkElement).toBeInTheDocument();
    });
    describe("Email Field Test", () => {
        it('Login Should be render', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Email Address/i);
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
        it('Login Should be render', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Password/i);
            expect(inputElement).toBeInTheDocument();
        });
        it('Login Should be change the Password Value', () => {
            render(<MockComponent />);
            const inputElement = screen.getByPlaceholderText(/Password/i);
            fireEvent.change(inputElement, { target: { value: "12345678" } });
            expect(inputElement.value).toBe("12345678");
        });
    })
})

