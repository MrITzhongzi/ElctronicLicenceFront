import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

export const deleteXsz = async (carType: string, carNum: string) => {
  try {
    let params = "?hphm=" + encodeURIComponent(carNum) + "&cllx=" + carType;   // 车牌号码中有汉字，需要编码
    const responseData = await axios.get(prefixAPi + "/Xsz/DeleteXsz" + params, defaultHeader());
    return responseData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
