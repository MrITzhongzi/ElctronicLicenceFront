import axios from 'axios';
import { prefixAPi } from '../api/prefix';
import { defaultHeader } from './Token';

/**
 *  这里返回的是所有行驶证 的简略信息
 * @returns {Promise<any>}
 */
export const getXszList = async () => {
  try {
    const responseData = await axios.get(prefixAPi + "/xsz/GetLicenseStatus", defaultHeader());
    return responseData.data;
  } catch (e) {
    return { status: "failed" };
  }
};
