import * as types from "../action-types";
import { reqUserInfo } from "@/api/user";

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo,
  };
};

export const setUserToken = (token) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
  };
};

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER,
  };
};

export const getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo(token).then(res => {
      const { data } = res;
      if(data.status === 0) {
        const userInfo = data.userInfo;
        dispatch(setUserInfo(userInfo))
        resolve(data)
      }else {
        const msg = data.message
        reject(msg)
      }
    }).catch(err => {
      reject(err)
    })
  })
}