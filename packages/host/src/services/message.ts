import { API_PREFIX } from '@wetrial/core/constants';
import { get } from '@wetrial/core/request';

export async function getMessages() {
  return get(`${API_PREFIX}message/getAll`);
}
