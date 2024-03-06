// 用户相关的字段类型的定义

interface LoginDataType {
  email: string;
  password: string;
}

interface UserAccount {
  name: string;
  email: string;
  password: string;
}

interface UserInfo {
  owner: UserAccount;
  avatar_url: string;
  epithet: string;
  experience: number;
  gender: string;
  hobbies: string;
  introduction: string;
  level: string;
  points: number;
}
export { LoginDataType, UserAccount ,UserInfo};
