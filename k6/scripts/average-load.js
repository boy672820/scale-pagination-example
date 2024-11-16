import http from 'k6/http';
import { sleep } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { userIds } from './users.js';

export const options = {
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  const token = randomItem(userIds);
  const res = http.get('http://localhost:3000/api/users/me/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  sleep(1);
};
