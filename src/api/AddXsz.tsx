import axios from 'axios';
import { defaultHeader } from "./Token";
import { prefixAPi } from './prefix';

export const  addXszInterface = async (type: string, num: string) => {
  console.log(type, num, "1111111");
  try {
    let requestData = await axios.get(prefixAPi + "/Api/XszApply?cllx=" + type + "&hphm=" + num,  defaultHeader());
    return requestData;
  } catch (e) {
    console.log("申请行驶证失败……");
    return { data: { status: "failed" } };
  }

};
