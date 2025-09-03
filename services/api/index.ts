import useMock from '../../config/useMock';
import { fetchClient } from'./fetchClient';
import { mockClient } from '../mocks/mockClient';
import { endpoints } from './endpoints';

export const apiService = {
  getUsers: () => useMock ? mockClient(endpoints.users) : fetchClient(endpoints.users),
  getPosts: () => useMock ? mockClient(endpoints.posts) : fetchClient(endpoints.posts),
};
