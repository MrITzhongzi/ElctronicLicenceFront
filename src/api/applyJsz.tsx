import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

export const applyJsz = async () => {
  try {
    const requestData = await axios.get(prefixAPi + "/Jsz/JszApply", defaultHeader());
    return requestData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
