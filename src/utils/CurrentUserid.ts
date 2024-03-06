// 封装基于ls存取删三个方法

const TOKENKEY:string = "CurrentUserid";

function setCurrentUseridn(token: string) {
  return localStorage.setItem(TOKENKEY, token);
}

function getCurrentUserid() {
  return localStorage.getItem(TOKENKEY);
}

function delCurrentUseridn() {
  return localStorage.removeItem(TOKENKEY);
}

export { setCurrentUseridn, getCurrentUserid, delCurrentUseridn };
