// 用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的Id
   * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;

    // 失去焦点、表单提交的时候触发validatorFunc，这里只能处理失去焦点的情况
    this.input.onblur = () => {
      // 有this指向问题————》用箭头函数
      // 因为在提交的时候也需要下面逻辑处理————》作为方法
      this.validate();
      /* const errMsg = await validatorFunc(this.input.value);
      if (errMsg) {
        this.p.innerText = errMsg;
      } else {
        this.p.innerText = "";
      } */
    };
  }

  /**
   * 验证，成功返回true，失败返回false
   */
  async validate() {
    const errMsg = await this.validatorFunc(this.input.value);

    if (errMsg) {
      // 有错误
      this.p.innerText = errMsg;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  // 方法名一样，但是为静态方法
  /**
   * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
   * @param {FieldValidator[]} validators
   */
  static async validate(...validators) {
    // 调用实例的validate方法
    const promiseArr = await validators.map((fieldValidator) =>
      fieldValidator.validate()
    ); // [Promise, Promise]

    const arr = await Promise.all(promiseArr); // [false, false]
    console.log(arr);

    return arr.every((bool) => bool);
  }
}
