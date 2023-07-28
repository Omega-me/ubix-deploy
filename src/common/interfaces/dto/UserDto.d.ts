/* eslint-disable @typescript-eslint/no-empty-interface */
import { eUserType } from 'common/enums';

export interface UserDataDto {
  profile?: boolean;
  userId?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
  type: string;
  role: string;
  postCode: string;
  address: string;
  country: string;
  location: number[];
  about: stirng;
  tags: string;
  socials: string[];
  openToWork: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto extends UserDataDto {
  id?: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  birthday: string;
  postCode: string;
  gender: string;
  type: eUserType;
  role: string;
}
