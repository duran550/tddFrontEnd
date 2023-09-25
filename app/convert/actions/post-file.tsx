import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';

export const postFile = async (
  formData: any,
  email: string | undefined | null,
  dispatch: any,
  state: any
) => {
  let URL = `${BACKEND_URL}/builder/?email=${email}`;

  await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        if (data.sucess && state.uploaded) {
          dispatch({ type: 'FILE_CONVERTED', payload: true });
        } else {
          dispatch({ type: 'FILE_CONVERTED', payload: false });
        }
      }
    })
    .catch((error) => {
      notifyError(error);
    });
};
