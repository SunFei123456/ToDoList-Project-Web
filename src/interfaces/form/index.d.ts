/* 表单数据 */
interface loginFormState {
  email: string;
  password: string;
}


/* 注册表单数据 */
interface registerFormState {
    username: string;
    email: string;
    password: string;
    againPassword: string;
}


export { loginFormState,registerFormState };
