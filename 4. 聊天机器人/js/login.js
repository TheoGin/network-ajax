const loginIdValidator = new FieldValidator("txtLoginId", async function (
  val
) {
  if (!val) {
    return "账号不能为空";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

const form = $(".user-form");
form.onsubmit = async function (e) {
  // 阻止默认刷新
  e.preventDefault();

  const result = await FieldValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );

  if (!result) {
    return; // 验证未通过
  }

  // 如果表单项太多，一个一个写会太麻烦 ————》用FormData对象，会帮你拿到form元素所有含name属性的表单
  const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
  console.log(formData.entries());
  // 把entries转为对象，即把[ ["foo", "bar"], ["baz", 42], ] 转为 { foo: "bar", baz: 42 }
  const loginInfo = Object.fromEntries(formData.entries());

  // 发送网络请求
  const resp = await API.login(loginInfo);
  console.log(resp);
  if (resp.code === 0) {
    alert("登录成功，跳转到首页");
    location.href = "index.html";
  } else {
    loginIdValidator.p.innerText = "账号或密码错误";
    // 并清空密码
    loginPwdValidator.input.value = "";
  }
};
