import { createMocks } from 'node-mocks-http';
import handler from '../pricing';

test('returns pricing plans', async () => {
  const { req, res } = createMocks({
    method: 'GET'
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual([
    {
      name: 'Basic',
      features: ['1 GB Storage', '10 GB Bandwidth', '24/7 Support'],
      price: '$10/month',
      annualPrice: '$100/year'
    },
    {
      name: 'Premium',
      features: ['10 GB Storage', '100 GB Bandwidth', '24/7 Support'],
      price: '$20/month',
      annualPrice: '$200/year'
    },
    {
      name: 'Ultimate',
      features: ['Unlimited Storage', 'Unlimited Bandwidth', '24/7 Support'],
      price: '$30/month',
      annualPrice: '$300/year'
    }
  ]);
});