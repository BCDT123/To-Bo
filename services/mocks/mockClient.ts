
import mockData from './mockData';

export async function mockClient<T>(endpoint: string): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData[endpoint] as T);
    }, 500); // Simula latencia
  });
}
