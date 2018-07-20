import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

export const deleteJsz = async () => {
  try {
    const responseData = await axios.get(prefixAPi + "/Jsz/DeleteJsz", defaultHeader());
    return responseData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
