import axios from 'axios';
import User from './User';
import { prefixAPi } from './prefix';
interface LoginRet {
  status: string;
  info: User;
}

export default async function login(data: string) {
  try {
    console.log(data, "ddd");
    const ret = await axios.get<LoginRet>(prefixAPi + "/account/Login", {params: {data}});
    console.log(ret, "ret");
    if (ret.data.status !== "ok") {
      return false;
    }

    localStorage.setItem("idNum", ret.data.info.idNum);
    localStorage.setItem("jsz", JSON.stringify(ret.data.info.jsz));
    localStorage.setItem("xsz", JSON.stringify(ret.data.info.xsz));
    localStorage.setItem("name", ret.data.info.name);
    localStorage.setItem("phone", ret.data.info.phone);
    localStorage.setItem("token", ret.data.info.token);
    return true;
  } catch (e) {
    console.log(e, "loginerr");
  }

  return false;
}
