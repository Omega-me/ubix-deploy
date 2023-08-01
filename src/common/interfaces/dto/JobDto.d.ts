/* eslint-disable @typescript-eslint/no-empty-interface */

export interface JobDataDto {
    id?: number,
    name: string,
    description: string,
    address: string,
    country: string,
    salary: number,
    tags: string[],
    createdAt: string,
    fullName: string,
    distance: number,
    images: string[] | null,
    profileImage: string | null;
}

export interface JobDetailDataDto {
    id?: number,
    name: string,
    description: string,
    address: string,
    country: string,
    salary: number,
    tags: string[],
    postCode: string[];
    requirements: string[];
    createdAt: string,
    companyName: string;
    location: number[];
    creatorEmail: string;
    creatorId: string;
    creatorPhoneNumber: string;
    creatorPostCode: string;
    creatorProfileImage?: string | null;
    socials: string[];
    updatedAt: string;
}

export interface CreateJobDto {
    id?: string;
    name: string;
    description: string;
    requirements?: string;
    postCode?: string;
    salary: string;
    socials: string[];
    tags?: string[];
    images?: string[] | null;
}
