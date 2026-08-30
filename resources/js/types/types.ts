type Flash = {
    error?: string;
    success?: string;
    custom?: string;
    id?: any,
};

type PageProps = {
    name: string;
    flash: Flash;
    auth: {
        user?: any
    }
};

export type { PageProps, Flash }