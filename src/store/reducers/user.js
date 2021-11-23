import * as types from "../action-types";

const initUserInfo = {
  name: "",
  role: "",
  avatar: "",
  token: "",
};

const user = (state = initUserInfo, action) => {
  switch(action.type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        name: action.name, // 名字
        role: action.role, // 菜单
        avatar: action.avatar // 头像
      }
    case types.USER_RESET_USER:
      return {}
    default: 
      return state
  }
}

export default user