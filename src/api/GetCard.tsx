import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

export const GetCard = async (cardId) => {
  try {
    const responseData = await axios.get(prefixAPi + "/WeiXin/GetCard?customCode=" + cardId, defaultHeader());

    return responseData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
