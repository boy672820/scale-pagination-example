import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import http from 'k6/http';
import papaparse from './lib/papaparse.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { scenario } from 'k6/execution';

export const options = {
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

const userIds = new SharedArray('another data name', function () {
  return papaparse.parse(open('./shared/users.csv'), { header: false }).data;
});

export default () => {
  const token = userIds[scenario.iterationInTest];
  console.log(token);
  // const res = http.get('http://localhost:3000/api/users/me/orders', {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  sleep(1);
};
