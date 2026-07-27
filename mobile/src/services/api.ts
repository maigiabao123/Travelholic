import * as SecureStore from 'expo-secure-store';

const API_URLS = {
  androidEmulator: 'http://10.0.2.2:5000',
  iosSimulator: 'http://localhost:5000',
  web: 'http://localhost:5000',
  physicalDevice: 'http://192.168.1.62:5000',
};

const RUNNING_ON_PHYSICAL_DEVICE = true;

export const API_BASE_URL = RUNNING_ON_PHYSICAL_DEVICE
  ? API_URLS.physicalDevice
  : API_URLS.androidEmulator;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await SecureStore.getItemAsync('authToken');

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || 'Không thể gọi API',
    );
  }

  return data as T;
}