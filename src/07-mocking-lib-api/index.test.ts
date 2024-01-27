import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const originalModule = jest.requireActual('lodash');

  jest.mock('lodash', () => ({
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  }));

  jest.mock('axios');
  const relativePath = 'posts';

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);

    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    //todo: mock axios.create
  });
});
