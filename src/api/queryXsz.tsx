import axios from 'axios';
import { defaultHeader } from "./Token";
import { prefixAPi } from './prefix';

/**
 *  这里查的是 单个 行驶证的详细信息
 * @param carType  02
 * @param carNum 鲁F65R43
 * @returns {Promise<any>}
 */
export const queryXszList = async (carType: string, carNum: string) => {
  try {
    let requestData = axios.get(prefixAPi + "/Xsz/GetXsz?hphm=" + carNum + "&cllx=" + carType, defaultHeader());
    return requestData;
  } catch (e) {
    console.log(e);
    return { data: {status: "failed"} };
  }

};
