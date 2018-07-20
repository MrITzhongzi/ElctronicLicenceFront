import axios from 'axios';
import * as wx from 'weixin-js-sdk';
import { prefixAPi } from './prefix';
import { defaultHeader } from '../api/Token';

export function onWeiXinErroe(cb: (e: any) => void) {
    wx.error(cb);
}

export function waitWxReady() {
    return new Promise(resolve =>
        wx.ready(() => resolve(true)));
}

export async function initWeiXinSDK() {
    try {
        const url = window.location.href;
        const ret = await axios.get(
          prefixAPi + "/WeiXin/GetWeiXinConfig", {params: {url}});

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: ret.data.appId, // 必填，公众号的唯一标识
            jsApiList: ['chooseImage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            nonceStr: ret.data.nonceStr, // 必填，生成签名的随机串必填
            signature: ret.data.signature, // 必填，签名，见附录1
            timestamp: ret.data.timestamp, // 必填，生成签名的时间戳
        });

        return true;
    } catch (e) {
        return false;
    }
}

export async function createJszCard() {
    try {
        const ret = await axios.get(prefixAPi + "/WeiXin/GetJszCard", defaultHeader()); // 需要token

        return ret.data.cardId;
    } catch (e) {
        return null;
    }
}

export async function createXszCard(carType: string, carNum: string) {
  try {
    let params = "?cllx=" + carType + "&hphm=" + carNum;
    const ret = await axios.get(prefixAPi + "/WeiXin/GetXszCard" + params, defaultHeader()); // 需要token
    return ret.data.cardId;
  } catch (e) {
    return null;
  }
}

export async function getCardConfig(cardId: string) {
    try {
        const ret = await axios.get(prefixAPi + "/WeiXin/GetCardConfig", {params: {cardId}, ...(defaultHeader())});
        return ret.data;
    } catch (e) {
        return null;
    }
}

export interface CardConfig {
    nonce_str: string;
    timestamp: string;
    signature: string;
}

export async function addCard(cardId: string, cardConfig: CardConfig) {

    return new Promise((resolve, reject) => wx.addCard({
        cardList: [
            {
                cardId,
                cardExt: JSON.stringify({

                    nonce_str: cardConfig.nonce_str,
                    timestamp: cardConfig.timestamp,
                    signature: cardConfig.signature
                })
            }
        ],
        success(res: any) {

            resolve(res);
        },
        cancel(res: any) {
            reject(res);
        }
    }));
}
