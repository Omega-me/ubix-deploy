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
  type: eUserType;
  role: string;
  postCode: string;
  address: string;
  country: string;
  location: number[];
  about: stirng;
  tags: string[];
  socials: string[];
  openToWork: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto extends UserDataDto {}
export interface UserDetailDataDto {
  id?: string;
  fullName: string;
  role: string;
  address: string;
  country: string;
  updatedAt: string;
  ratingsAverage?: number | null;
  profileImage: string;
  distance?: number;
  tags?: string[];
}

export interface CandidateDataDto {
  about: string;
  address: string;
  country: string;
  fullName: string;
  id: string;
  lastExperienceCompanyName: string | null;
  lastExperienceEndingDate: string | null;
  lastExperienceStartingDate: string | null;
  lastRatingCreatedAt: string | null;
  lastRatingFeedback: number | null;
  lastRatingStars: number | null;
  phoneNumber: string;
  postCode: string;
  ratingUserFullName: string;
  role: string;
  socials: string[] | null;
  tags: string[] | null;
  totalExperience: string;
  totalRatings: string;
  profileImage?: string;
}
