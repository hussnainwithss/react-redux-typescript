export interface Props {
    workFilters: string[];
    educationFilters: string[];
    hometownFilters: string[];
}

export type FormValues = {
    work?: string;
    education?: string;
    hometown?: string;
    relationship_status?: string;
    gender?: string;
};
