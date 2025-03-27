export interface Blog {
    ID: number;
    Titlle: string;
    Author: string;
    Content: string;
    IsPaid: boolean;
    CategoryID: number;
    CreatedAt: Date;
    LastModifiedAt: Date
}