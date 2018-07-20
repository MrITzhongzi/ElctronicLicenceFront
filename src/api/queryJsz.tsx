import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

export const queryJsz = async () => {
  try {
    const responseData = await axios.get(prefixAPi + "Jsz/GetJsz", defaultHeader());
    return responseData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
