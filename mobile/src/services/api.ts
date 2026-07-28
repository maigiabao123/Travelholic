import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

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

let isRedirectingToLogin = false;

export class AuthRequiredError extends Error {
  constructor() {
    super('AUTH_REQUIRED');
    this.name = 'AuthRequiredError';
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await SecureStore.getItemAsync('authToken');

  const url = `${API_BASE_URL}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, {
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
  } catch (error) {
    console.error('Network error:', error);

    throw new Error(
      'Không thể kết nối đến server. Hãy kiểm tra API URL và Wi-Fi.',
    );
  }

  // Đọc response dưới dạng text trước
  const responseText = await response.text();

  // Cố gắng parse JSON; nếu server trả HTML thì không bị crash
  let data: any = null;

  if (responseText.trim()) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    console.log('API URL:', url);
    console.log('Status:', response.status);
    console.log('Response:', responseText.substring(0, 500));

    // Token hết hạn hoặc không hợp lệ
    if (response.status === 401 && !isRedirectingToLogin) {
      isRedirectingToLogin = true;

      await SecureStore.deleteItemAsync('authToken');

      router.replace('/login');

      // Cho phép xử lý lại sau khi đăng nhập
      setTimeout(() => {
        isRedirectingToLogin = false;
      }, 1500);

      // Không hiển thị "Token đã hết hạn" như lỗi thông thường
      throw new AuthRequiredError();
    }

    const errorMessage =
      data?.message ||
      `API lỗi ${response.status}: ${responseText.substring(0, 200)}`;

    throw new Error(errorMessage);
  }

  // API thành công nhưng không trả nội dung
  if (!responseText.trim()) {
    return null as T;
  }

  // API thành công nhưng lại trả dữ liệu không phải JSON
  if (data === null) {
    console.error('Expected JSON but received:', responseText);

    throw new Error('Server không trả dữ liệu JSON hợp lệ.');
  }

  return data as T;
}