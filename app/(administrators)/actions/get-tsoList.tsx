import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const getTsoList = async () => {
  let URL = `${BACKEND_URL}/companies/`;

  try {
    // Retrieving data from backend

    const res = await axios.get(URL, {
      headers: {
        Authorization: `bearer ${getToken()}`,
      },
    });

    let data = res?.data?.tso_list;

    return data;
  } catch (error) {
    notifyError(`${error}`);
  }
};
