import { render, fireEvent } from '@testing-library/react';
import ContactUsForm from '../ContactUsForm';

test('renders correctly', () => {
  const { getByText } = render(<ContactUsForm />);
  expect(getByText('Contact Us')).toBeInTheDocument();
});

test('handles submit', () => {
  const { getByLabelText, getByText } = render(<ContactUsForm />);
  fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
  fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(getByLabelText('Meeting Date'), { target: { value: '2022-12-31' } });
  fireEvent.change(getByLabelText('Message'), { target: { value: 'Hello, world!' } });
  fireEvent.click(getByText('Submit'));
  expect(getByText('Thank you for contacting us!')).toBeInTheDocument();
});