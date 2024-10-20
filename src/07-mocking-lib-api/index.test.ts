import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/testDir/1';
  const responseData = { data: 'some data' };
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runAllTimers();
  });

  test('should create instance with provided base url', async () => {
    const createMock = axios.create as jest.Mock;
    createMock.mockReturnValue({
      get: jest.fn().mockReturnValue(responseData),
    });

    await throttledGetDataFromApi(relativePath);
    expect(createMock).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(responseData);
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(responseData);

    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toEqual(responseData.data);
  });
});
