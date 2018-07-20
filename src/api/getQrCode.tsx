import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

export const GetJszQrcode = async () => {
  try {
    const requestData = await axios.get(prefixAPi + "/Api/GetJszQrcode", defaultHeader());
    return requestData.data;
  } catch (e) {
    return { status: "failed" };
  }
};

export const GetXszQrcode = async (carType: string, carNum: string) => {
  let params = "?cllx=" + carType + "&hphm=" + encodeURIComponent(carNum);
  try {
    const requestData = await axios.get(prefixAPi + "/Api/GetXszQrcode" + params, defaultHeader());
    return requestData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
