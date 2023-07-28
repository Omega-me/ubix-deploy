/* eslint-disable @typescript-eslint/no-empty-interface */

export interface JobDataDto {
    id?: number,
    name: string,
    description: string,
    address: 'string',
    country: 'string',
    salary: number,
    tags: string[],
    createdAt: 'string',
    fullName: 'string',
    distance: 'number',
    images: string[] | null,
    profileImage: string | null;
}

export interface CreateJobDto extends JobDataDto {
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
