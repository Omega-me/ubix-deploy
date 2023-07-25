/* eslint-disable @typescript-eslint/no-empty-interface */
export interface LoginUserDto {
  email: string;
  password: string;
}

export interface SignupUserDto extends LoginUserDto {}
