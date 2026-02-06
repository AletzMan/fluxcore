"use client"
import styles from './DataTable.module.scss'
import { Button, Checkbox, DatePicker, Divider, Dropdown, Input, Join, Link, Table, Tag } from 'lambda-ui-components';
import { Calendar, Eye, Filter, FilterIcon, List, ListFilter, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Pagination } from '@/typesAPI/common.types';
import { Fragment, useState } from 'react';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { DateItem } from './DateItem';
import { formatDateTimeShort } from '@/utils/common-utils';

type FilterType = "string" | "number" | "date" | "boolean" | "actions";

//Tipos de acciones para las diferentes combinaciones
type ActionsType = ["view"] | ["edit"] | ["delete"] | ["view", "edit"] | ["view", "delete"] | ["edit", "delete"] | ["view", "edit", "delete"];

export interface DataTableColumn<T> {
    sortKey: string;
    type?: FilterType;
    nameColumn?: string;
    width?: string;
    align?: "left" | "center" | "right";
    isSortable?: boolean;
    render?: (value: T) => React.ReactNode;
}


interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    pagination?: Pagination;
    success?: boolean;
    actions?: ActionsType;
    filters?: {
        id?: string,
        key: string,
        value: string,
        label: string,
        type: FilterType,
        nameGroup: string
    }[];
}

export const DataTable = <T extends { id: string | number }>({
    data,
    columns,
    pagination,
    success,
    actions,
    filters
}: DataTableProps<T>) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const router = useRouter();

    console.log(data);

    const paginationParams = ['page', 'pageSize'];
    const currentKeys = Array.from(searchParams.keys());
    const isSearchActive = currentKeys.some(key => !paginationParams.includes(key));

    const handleSearchURL = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        handleSearchURL(searchValue);
    }


    const handleFilter = (filter: string, value: string, checked: boolean, type: FilterType) => {
        const params = new URLSearchParams(searchParams);
        const currentVal = params.get(filter);
        let values = currentVal ? currentVal.split(',') : [];

        if (type === 'date') {
            if (value) {
                params.set(filter, value);
            } else {
                params.delete(filter);
            }
            params.set('page', '1');
            router.replace(`${pathname}?${params.toString()}`);
            return;
        }

        if (checked) {
            if (!values.includes(value)) {
                values.push(value);
            }
        } else {
            values = values.filter(v => v !== value);
        }

        if (values.length > 0) {
            params.set(filter, values.join(','));
        } else {
            params.delete(filter);
        }

        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    }

    const handleRemoveFilter = (key: string, value?: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            const currentVal = params.get(key);
            if (currentVal) {
                const values = currentVal.split(',').filter(v => v !== value);
                if (values.length > 0) {
                    params.set(key, values.join(','));
                } else {
                    params.delete(key);
                }
            }
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    }

    const getDateValue = (key: string) => {
        const val = searchParams.get(key);
        if (!val) return undefined;
        if (val.includes('-')) {
            const [y, m, d] = val.split('-').map(Number);
            return new Date(y, m - 1, d);
        }
        return new Date(val);
    };

    const handleDateChange = (key: string, type: FilterType, date: Date | null) => {
        if (!date) {
            handleFilter(key, '', true, type);
            return;
        }
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        handleFilter(key, `${year}-${month}-${day}`, true, type);
    };

    const checkIsDateDisabled = (key: string, date: Date) => {
        const parseDate = (val: string) => {
            const [y, m, d] = val.split('-').map(Number);
            return new Date(y, m - 1, d);
        };

        if (key.endsWith('From')) {
            const toKey = key.replace('From', 'To');
            const toValue = searchParams.get(toKey);
            if (toValue) {
                const toDate = parseDate(toValue);
                toDate.setHours(0, 0, 0, 0);
                const compareDate = new Date(date);
                compareDate.setHours(0, 0, 0, 0);
                return compareDate > toDate;
            }
        }

        if (key.endsWith('To')) {
            const fromKey = key.replace('To', 'From');
            const fromValue = searchParams.get(fromKey);
            if (fromValue) {
                const fromDate = parseDate(fromValue);
                fromDate.setHours(0, 0, 0, 0);
                const compareDate = new Date(date);
                compareDate.setHours(0, 0, 0, 0);
                return compareDate < fromDate;
            }
        }

        return false;
    };

    //Agrupar filtros por valor
    const filterByValue = filters?.reduce((acc, filter) => {
        if (!acc[filter.nameGroup]) {
            acc[filter.nameGroup] = [];
        }
        acc[filter.nameGroup].push(filter);
        return acc;
    }, {} as Record<string, typeof filters>);

    //Obtener las etiquetas de los filtros activos y sus valores
    const getFiltersActive = () => {
        const active: { key: string, label: string | undefined, value: string | undefined, originalValue: string, color: string }[] = [];

        // Convertimos a array y filtramos para obtener un index real de los grupos activos
        const filteredParams = Array.from(searchParams.entries()).filter(([key]) =>
            !['page', 'search', 'sort', 'order'].includes(key)
        );

        filteredParams.forEach(([key, val], groupIndex) => {
            const color = colorTags[groupIndex % colorTags.length];

            val.split(',').forEach((v) => {
                const filterMatch = filters?.find(f => f.key === key && f.value === v);
                if (filterMatch) {
                    active.push({
                        key: key,
                        label: filterMatch.nameGroup,
                        value: filterMatch.label,
                        originalValue: v,
                        color: color
                    });
                } else {
                    const genericFilter = filters?.find(f => f.key === key);
                    if (genericFilter) {
                        active.push({
                            key: key,
                            label: genericFilter.nameGroup,
                            value: v,
                            originalValue: v,
                            color: color
                        });
                    }
                }
            });
        });
        return active;
    }


    console.log(filterByValue);
    console.log(getFiltersActive());

    return (
        <div className={styles.datatable}>
            <header className={styles.datatable_header}>
                <div >
                    <div className={styles.datatable_search}>
                        <Join size="small" >
                            <Input
                                placeholder="Buscar"
                                type="search"
                                prefix={<Search />}
                                onChange={handleSearch}
                                value={search}
                            />
                        </Join>

                    </div>
                    <Button
                        size='small'
                        variant={isFilterOpen ? 'solid' : 'themed'}
                        color='neutral'
                        label='Filtros'
                        icon={<ListFilter />}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    />
                </div>
                <div className={`${styles.datatable_filters} ${isFilterOpen ? styles.datatable_filters_open : ''}`}>
                    {filterByValue && Object.keys(filterByValue).map((key, index) => (
                        <Dropdown
                            key={key}
                            onSelect={(value) => console.log(value)}
                            icon={filterByValue[key]![0].type === "string" ? <List /> : filterByValue[key][0].type === "date" ? <Calendar /> : <List />}
                            size='small'
                            variant='solid'
                            text={key}
                        >
                            <Fragment key={key}>
                                {
                                    filterByValue[key].map((filter) => (
                                        filter.type === 'date' ? (
                                            <div className={styles.datatable_filters_custom} key={filter.id}>
                                                <DatePicker
                                                    label={filter.label}
                                                    size='tiny'
                                                    value={getDateValue(filter.key)}
                                                    onChange={(e: any) => handleDateChange(filter.key, filter.type, e)}
                                                    isDateDisabled={(date) => checkIsDateDisabled(filter.key, date)}
                                                    displayFormat="medium"
                                                    type="inline"
                                                />
                                            </div>
                                        ) : (
                                            <Dropdown.ItemCustom key={filter.id} data-navigable>
                                                <Checkbox
                                                    label={filter.label}
                                                    size='tiny'
                                                    color='secondary'
                                                    checked={searchParams.get(filter.key)?.split(',').includes(filter.value) || false}
                                                    onChange={(e) => {
                                                        handleFilter(filter.key, filter.value, e.target.checked, filter.type);
                                                    }}
                                                />
                                            </Dropdown.ItemCustom>
                                        )
                                    ))
                                }
                            </Fragment>
                        </Dropdown>
                    ))}
                </div>
                <Divider color='neutral' contentPosition="start" spacing={0}><span className={styles.datatable_divider}>Filtros activos</span></Divider>
                <div className={styles.datatable_tags}>
                    {getFiltersActive().map((filter, index) => (
                        <Tag
                            key={`${filter.key}-${index}`}
                            size='small'
                            variant='subtle'
                            radius='large'
                            color="neutral"
                            onClose={() => handleRemoveFilter(filter.key, filter.originalValue)}
                        >
                            <span>{filter.label}:</span>
                            <span>{filter.value}</span>
                        </Tag>
                    ))}
                </div>
            </header>
            <div>
                <Table
                    data={data}
                    size='tiny'
                    onSortColumn={(sortKey, direction) => console.log(sortKey, direction)}
                    highlightOnHover
                    pagination={pagination && pagination.totalPages > 1 ? {
                        page: pagination?.page,
                        totalPages: pagination?.totalPages,
                        totalRows: pagination?.totalRecords,
                        onPageChange: (page) => router.push(`/admin/tenants?page=${page}`),

                    } : undefined}>
                    <Table.Header>
                        <Table.Row>
                            {columns.map((column) => (
                                <Table.ColumnHeader
                                    key={column.sortKey}
                                    sortKey={column.sortKey}
                                    width={column.width}
                                    isSortable={column.isSortable}
                                >
                                    {column.nameColumn || column.sortKey.charAt(0).toUpperCase() + column.sortKey.slice(1)}
                                </Table.ColumnHeader>
                            ))}
                            {actions && (
                                <Table.ColumnHeader
                                    sortKey="actions"
                                    width="100px"
                                    isSortable={false}
                                >
                                    Acciones
                                </Table.ColumnHeader>
                            )}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((item) => (
                            <Table.Row key={item.id}>
                                {columns.map((col, index) => (
                                    <Table.Cell key={`${item.id}-${index}`} align={col.align || 'left'}>
                                        {/* Aquí ejecutamos la función render de la columna */}
                                        {col.render && col.render(item)}
                                    </Table.Cell>
                                ))}
                                {/*Renderizar para cuando sea actions */}
                                <Table.Cell  >
                                    <div className={styles.datatable_actions}>
                                        {actions && actions.map((action) => (
                                            <Link
                                                key={action}
                                                href={action === "view" ? `${pathname}/${item.id}` : action === "edit" ? `${pathname}/${item.id}/edit` : action === "delete" ? `${pathname}/${item.id}/delete` : ""}
                                                size='tiny'
                                                variant='solid'
                                                type='button'
                                                color={action === "view" ? "primary" : action === "edit" ? "secondary" : action === "delete" ? "danger" : "primary"}
                                                icon={action === "view" ? <Eye /> : action === "edit" ? <Pencil /> : action === "delete" ? <Trash2 /> : ""}
                                            />
                                        ))}
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}

                    </Table.Body>
                </Table>
            </div>
            <TableError
                isSearch={isSearchActive}
                isEmptyResponse={data?.length === 0}
                isError={!success}
                onResetFilters={() => {
                    setSearch('');
                    router.replace(`${pathname}?page=1`);
                }}
            />
        </div>
    );
}

const colorTags: ("success" | "primary" | "secondary" | "danger" | "warning" | "info" | "neutral")[] = [
    "primary",
    "success",
    "danger",
    "info",
    "warning",
    "neutral",
    "secondary",
]