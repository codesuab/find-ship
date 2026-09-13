export const permission = {
    dashboard: ['view'],
    customers: ['view', 'create', 'update', 'delete', 'preview'],
    admins: ['view', 'create', 'update', 'delete'],
    roles: ['view', 'create', 'update', 'delete'],
    settings: ['view', 'update'],
    smtp: ['view', 'update'],
    vessels: ['view'],
    ui: ['view', 'create', 'update', 'delete'],
    api: ['view', 'create', 'update', 'delete'],
    country: ['view', 'create', 'update', 'delete']
} as const;