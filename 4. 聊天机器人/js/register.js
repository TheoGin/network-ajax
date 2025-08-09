const loginIdValidator = new FieldValidator("txtLoginId", async function (
  val
) {
  if (!val) {
    return "账号不能为空";
  }

  // 还要判断账号是否存在
  const resp = await API.exists(val);
  if (resp.data) {
    // 账号已存在
    return "该账号已存在，请重新选择一个账号";
  }
});

const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "昵称不能为空";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

const loginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  function (val) {
    if (!val) {
      return "确认密码不能为空";
    }
    if (val !== loginPwdValidator.input.value) {
      return "两次密码不一致";
    }
  }
);

/* function test() {
  FieldValidator.validate(loginIdValidator, nicknameValidator).then(
    (resp) => {
      console.log(resp);
    }
  );
} */

$(".user-form").onsubmit = async function (e) {
  // 阻止默认刷新
  e.preventDefault();

  const result = await FieldValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator
  );

  if (!result) {
    return; // 验证未通过
  }

  /* const data = {
    loginId: loginIdValidator.input.value,
    loginPwd: loginPwdValidator.input.value,
    nickname: nicknameValidator.input.value,
  }; */
  // 如果表单项太多，一个一个写会太麻烦 ————》用FormData对象，会帮你拿到form元素所有含name属性的表单
  const formData = new FormData($(".user-form")); // 传入表单dom，得到一个表单数据对象
  console.log(formData.entries());
  // 把entries转为对象，即把[ ["foo", "bar"], ["baz", 42], ] 转为 { foo: "bar", baz: 42 }
  const userInfo = Object.fromEntries(formData.entries());

  // 提交表单
  const resp = await API.reg(userInfo);
  console.log(resp);
  if (resp.code === 0) {
    alert("注册成功，跳转到登录页");
    location.href = "login.html";
  } else {
    alert("注册失败");
  }
};
