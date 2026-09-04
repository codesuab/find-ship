type Flash = {
    error?: string;
    success?: string;
    custom?: string;
    id?: any,
};

type Admin = {
    id: number,
    name: string,
    email: string,
    avatar?: string | null,
}

type PageProps = {
    name: string;
    flash: Flash;
    auth: {
        user?: any,
        admin?: Admin | null
    }
};

export type { PageProps, Flash }