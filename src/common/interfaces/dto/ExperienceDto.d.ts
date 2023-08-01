export interface ExperienceDto {
    id?: number;
    jobName: string;
    companyName: string;
    startingDate: string;
    endingDate?: string | null;
}