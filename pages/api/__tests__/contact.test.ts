import { createMocks } from 'node-mocks-http';
import handler from '../contact';

test('stores contact data', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      date: '2022-12-31',
      message: 'Hello, world!'
    }
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual({
    name: 'John Doe',
    email: 'john.doe@example.com',
    date: '2022-12-31',
    message: 'Hello, world!'
  });
});