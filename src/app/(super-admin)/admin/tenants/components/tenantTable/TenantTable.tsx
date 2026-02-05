"use client"
import { Tenant } from '@/typesModels/Tenant';
import styles from './TenantTable.module.scss'
import { Button, Table, Tag, useNotification } from 'lambda-ui-components';
import { formatDateTimeShort } from '@/utils/common-utils';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PagedResponse } from '@/typesAPI/common.types';
import { ErrorMessages } from '../../../../../../lib/errors/message-errors';
import { useEffect } from 'react';
import { TableError } from '@/pp/components/ui/TableError/TableError';

interface TenantTableProps {
    data: PagedResponse<Tenant>;
}

export const TenantTable = ({ data }: TenantTableProps) => {
    const searchParams = useSearchParams();
    const { showNotification } = useNotification();
    const router = useRouter();

    useEffect(() => {
        if (data.success === false) {
            showNotification({
                title: "Error",
                message: ErrorMessages[data.code!] || data.message || "Error desconocido",
                notificationType: "danger"
            });
        }
    }, [data]);

    const paginationParams = ['page', 'pageSize'];
    const currentKeys = Array.from(searchParams.keys());
    const isSearchActive = currentKeys.some(key => !paginationParams.includes(key));


    return (
        <div className={styles.tenanttable}>
            <div>
                <Table
                    data={data!.data!}
                    size='tiny'
                    highlightOnHover
                    pagination={data.pagination ? {
                        page: data.pagination?.page,
                        totalPages: data.pagination?.totalPages,
                        totalRows: data.pagination?.totalRecords,
                        onPageChange: (page) => router.push(`/admin/tenants?page=${page}`),

                    } : undefined}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader sortKey="id" width='3rem' >Id</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="name" width='100%'>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="subscription" width='15rem'>Suscripción</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="isActive" width='7rem'>Estado</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="createdAt" width='20rem'>Fecha de creación</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="actions" width='10rem'>Acciones</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.data?.map((tenant) => (
                            <Table.Row key={tenant.id}>
                                <Table.Cell align="center">{tenant.id}</Table.Cell>
                                <Table.Cell>{tenant.name}</Table.Cell>
                                <Table.Cell align="center"><Tag variant="soft" color={colorSubscription(tenant.subscription)}>{tenant.subscription}</Tag></Table.Cell>
                                <Table.Cell align="center"><Tag color={tenant.isActive ? 'success' : 'warning'}>{tenant.isActive ? 'Activo' : 'Inactivo'}</Tag></Table.Cell>
                                <Table.Cell align="center">{formatDateTimeShort(tenant.createdAt)}</Table.Cell>
                                <Table.Cell align="center">
                                    <div className={styles.table_actions}>
                                        <Button variant="soft" size="tiny" color="neutral" icon={<Eye />} />
                                        <Button variant="soft" size="tiny" color="info" icon={<Pencil />} />
                                        <Button variant="soft" size="tiny" color="danger" icon={<Trash2 />} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <TableError isSearch={isSearchActive} isEmptyResponse={data.data?.length === 0} isError={!data.success} />
        </div>
    );
}

const colorSubscription = (subscription: string) => {
    switch (subscription) {
        case 'Free':
            return 'warning';
        case 'Standard':
            return 'success';
        case 'Enterprise':
            return 'info';
        default:
            return 'neutral';
    }
}