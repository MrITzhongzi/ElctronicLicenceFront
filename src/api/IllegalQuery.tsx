import axios from 'axios';
import { defaultHeader } from "./Token";
import { prefixAPi } from './prefix';

export const illegalQuery  = async (type: string, num: string) => {
  console.log(type, num, "1111111");
  try {
    let requestData = await axios.get(prefixAPi + "/Api/Peccancy?cllx=" + type + "&hphm=" + num,  defaultHeader());
    return requestData;
  } catch (e) {
    return { data: { status: "failed" } };
  }
};
