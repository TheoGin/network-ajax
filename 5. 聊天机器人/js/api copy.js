// const baseURL = "https://study.duyiedu.com";
// 注意常量命名
const BASE_URL = "https://study.duyiedu.com";


async function reg(userInfo) {
  const resp = await fetch(BASE_URL + "/api/user/reg", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  }); // 接收完响应头
  return await resp.json(); // 接收完响应体
}

/* (async function () {
  const resp = await reg({
    loginId: "theogin",
    loginPwd: "123",
    nickname: "NickNametheogin",
  });
  console.log(resp);
})(); */

async function login(loginInfo) {
  const response = await fetch(BASE_URL + "/api/user/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
  //   return await response.json();
  // 不能直接返回，因为登录完要做一些事情，
  const responseBody = await response.json();
  //   console.log(responseBody.getResponseHeader('authorization')); // responseBody.getResponseHeader is not a function

  if (responseBody.code === 0) {
    const token = response.headers.get("authorization");
    localStorage.setItem("token", token);
  }

  return await response.json(); // 直接返回还是没有添加请求头
  //   return responseBody;
}

(async function () {
  const resp = await login({
    loginId: "theogin",
    loginPwd: "123",
  });
  //   console.log(resp);
})();

async function exists(loginId) {
  const resp = await fetch(BASE_URL + "/api/user/exists?loginId=" + loginId);
  return await resp.json();
}

/* (async function () {
  const resp = await exists('theogin');
  console.log(resp);
})(); */

function profile() {
  const token = localStorage.getItem("token");
  return token;
}

/* (async function () {
  console.log(profile());
})(); */

async function sendChat(content) {
  const resp = await fetch(BASE_URL + "/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: profile(),
    },
    body: JSON.stringify({ content }),
  }); // 接收完响应头
  return await resp.json(); // 接收完响应体
}

(async function () {
  const resp = await sendChat("hello");
  console.log(resp);
})();

async function getHistory() {
  const resp = await fetch(BASE_URL + "/api/chat/history", {
    headers: {
      authorization: profile(),
    },
  });
  return await resp.json();
}

(async function () {
  const resp = await getHistory();
  console.log(resp);
})();
