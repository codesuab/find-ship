type Flash = {
    error?: string;
    success?: string;
    custom?: string;
    id?:any,
};

type PageProps = {
    name: string;
    flash: Flash;
};

export type { PageProps,Flash }