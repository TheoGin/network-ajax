// 防止污染全局变量
// 1. 用const定义的函数（不推荐）
// 2. 用立即执行函数
const API = (function () {
  // const baseURL = "https://study.duyiedu.com";
  // 注意常量命名
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  // 统一处理 get 请求
  function get(path) {
    // 统一携带请求头authorization
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // headers.token = token;
      // 记得要拼接上 Bearer，且是 authorization 字段
      headers.authorization = `Bearer ${token}`;
    }
    console.log(headers);

    return fetch(BASE_URL + path, {
      headers,
    });
  }

  // 统一处理 post 请求
  function post(path, bodyObj) {
    // 统一携带请求头authorization
    const headers = {
      "content-type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // headers.token = token;
      // 记得要拼接上 Bearer，且是 authorization 字段
      headers.authorization = `Bearer ${token}`;
    }

    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }

  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo); // 接收完响应头
    return await resp.json(); // 接收完响应体
  }

  /* (async function () {
  const resp = await reg({
    loginId: "sopho",
    loginPwd: "123",
    nickname: "NickNametheogin",
  });
  console.log(resp);
})(); */

  async function login(loginInfo) {
    const response = await post("/api/user/login", loginInfo);

    //   return await response.json();
    // 不能直接返回，因为登录完要做一些事情，
    const responseBody = await response.json();
    //   console.log(responseBody.getResponseHeader('authorization')); // responseBody.getResponseHeader is not a function

    if (responseBody.code === 0) {
      const token = response.headers.get("authorization");
      // localStorage.setItem("token", token);
      // 用常量，方便更改
      localStorage.setItem(TOKEN_KEY, token);
    }

    return await response.json();
    //   return responseBody;
  }

  /* (async function () {
  const resp = await login({
    loginId: "theo",
    loginPwd: "123",
  });
  //   console.log(resp);
})(); */

  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  /* (async function () {
  const resp = await exists('theo');
  console.log(resp);
})(); */

  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  /* (async function () {
  const resp = await profile();
  console.log(resp);
})(); */

  async function sendChat(content) {
    const resp = await post("/api/chat", { content }); // 接收完响应头
    return await resp.json(); // 接收完响应体
  }

  /* (async function () {
  const resp = await sendChat("hello");
  console.log(resp);
})(); */

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  /* (async function () {
  const resp = await getHistory();
  console.log(resp);
})(); */

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
  };
})();
