/** IDs de las secciones editables de un tenant.
 *  Este archivo NO tiene "use client" para que pueda ser importado
 *  tanto en Server Components como en Client Components.
 */
export const TENANT_SECTIONS = {
    GENERAL: 'tenant-general',
    CONTACT: 'tenant-contact',
    STATUS:  'tenant-status',
    LOGO: 'tenant-logo',
} as const;

export type TenantSectionId = typeof TENANT_SECTIONS[keyof typeof TENANT_SECTIONS];
