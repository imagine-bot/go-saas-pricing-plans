import { render, fireEvent } from '@testing-library/react';
import PricingCard from '../PricingCard';

test('renders correctly', () => {
  const plan = {
    name: 'Basic',
    features: ['1 GB Storage', '10 GB Bandwidth', '24/7 Support'],
    price: '$10/month',
    annualPrice: '$100/year'
  };
  const { getByText } = render(<PricingCard plan={plan} selectedPlan="" setSelectedPlan={() => {}} />);
  expect(getByText('Basic')).toBeInTheDocument();
  expect(getByText('1 GB Storage')).toBeInTheDocument();
  expect(getByText('10 GB Bandwidth')).toBeInTheDocument();
  expect(getByText('24/7 Support')).toBeInTheDocument();
  expect(getByText('$10.00/month')).toBeInTheDocument();
});

test('handles sign up', () => {
  const plan = {
    name: 'Basic',
    features: ['1 GB Storage', '10 GB Bandwidth', '24/7 Support'],
    price: '$10/month',
    annualPrice: '$100/year'
  };
  const setSelectedPlan = jest.fn();
  const { getByText } = render(<PricingCard plan={plan} selectedPlan="" setSelectedPlan={setSelectedPlan} />);
  fireEvent.click(getByText('Sign Up'));
  expect(setSelectedPlan).toHaveBeenCalledWith('Basic');
});