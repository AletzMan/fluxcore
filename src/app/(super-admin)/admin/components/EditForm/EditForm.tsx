"use client";
import styles from './EditForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Checkbox, Dialog, Divider, FileUpload, Input, InputNumber, TextArea } from 'lambda-ui-components';
import { useState } from 'react';
import type { ZodType } from 'zod';
import { apiFluxCorePatch, apiFluxCorePut } from '@/app/services/api/axios-instance';
import { EditIcon } from 'lucide-react';

export type EditFieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'file';

export interface SelectOption {
    label: string;
    value: string | number;
}

export interface EditFormField<T extends Record<string, any> = Record<string, any>> {
    /** Clave del objeto que se enviará a la API */
    key: keyof T;
    /** Label visible en el formulario */
    label: string;
    /** Tipo del campo */
    type: EditFieldType;
    placeholder?: string;
    /** Solo para type='select' */
    options?: SelectOption[];
    /** Props extra para el campo numérico */
    min?: number;
    max?: number;
}

export interface EditFormProps<T extends Record<string, any>> {
    /** Campos del formulario */
    fields: EditFormField<T>[];
    /** Valores actuales del recurso */
    defaultValues: Partial<T>;
    /** Schema de validación Zod */
    schema: ZodType;
    /** Ruta de la API (ej. '/plans/1') */
    apiUrl: string;
    /** Método HTTP para el submit */
    method?: 'PUT' | 'PATCH';
    /** Callback al guardar con éxito */
    onSuccess?: (data: T) => void;
    /** ID del recurso a editar */
    id: number;
    /** Estado abierto del Dialog (controlado por el padre vía store) */
    isOpen: boolean;
    /** Callback para cerrar el Dialog */
    onClose: () => void;
    /** Título del dialog */
    title?: string;
    /** Descripción del dialog */
    description?: string;
    /** Acción de servidor específica a llamar. Si no se provee, se usará formData hacia apiUrl con el method */
    onSubmitAction?: (id: number, data: any) => Promise<any>;
    /** Si es true, enviará los datos como FormData lugar de JSON (útil para subir archivos) */
    isMultipart?: boolean;
}

export const EditForm = <T extends Record<string, any>>({
    fields,
    defaultValues,
    schema,
    apiUrl,
    method = 'PUT',
    onSuccess,
    id,
    isOpen,
    onClose,
    title = 'Editar',
    description,
    onSubmitAction,
    isMultipart = false,
}: EditFormProps<T>) => {

    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<T>({
        resolver: zodResolver(schema as any),
        defaultValues: defaultValues as any,
    });

    const onSubmit = async (data: T) => {
        setIsLoading(true);
        setStatus(null);
        try {
            // Payload: JSON por defecto o FormData si es multipart
            let payload: any;

            if (isMultipart) {
                payload = new FormData();
                fields.forEach((field) => {
                    const value = data[field.key as string];
                    if (value !== undefined && value !== null) {
                        payload.append(field.key as string, value);
                    }
                });
            } else {
                payload = fields.reduce((acc, field) => {
                    acc[field.key as string] = data[field.key as string];
                    return acc;
                }, {} as Record<string, any>);
            }

            const response = onSubmitAction
                ? await onSubmitAction(id, payload)
                : method === 'PATCH'
                    ? await apiFluxCorePatch(apiUrl, payload)
                    : await apiFluxCorePut(apiUrl, payload);
            console.log("response", response);
            if ((response as any)?.success === false) {
                setStatus({ type: 'error', message: (response as any).message || 'Error al guardar los cambios.' });
                return;
            }

            setStatus({ type: 'success', message: 'Los cambios se guardaron correctamente.' });
            onSuccess?.(response as unknown as T);

            // Pequeño delay para que el usuario vea el mensaje de éxito, luego cierra
            setTimeout(() => {
                setStatus(null);
                onClose();
                // Refrescar la data del servidor
                window.location.reload();
            }, 1200);

        } catch {
            setStatus({ type: 'error', message: 'Ocurrió un error inesperado. Intenta de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset(defaultValues as any);
        setStatus(null);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            title={
                <div className={styles.header}>
                    <h2 className={styles.title}><EditIcon /> {title}</h2>
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            }

        >
            <div className={styles.editform}>


                <Divider spacing={0} />

                {/* Alert de estado */}
                {status && (
                    <Alert
                        message={status.message}
                        color={status.type === 'success' ? 'success' : 'danger'}
                        onClose={() => setStatus(null)}
                    />
                )}

                {/* Formulario de campos */}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.fields}>
                        {fields.map((field) => {
                            const key = field.key as string;
                            const error = (errors as any)[key]?.message as string | undefined;

                            return (
                                <Controller
                                    key={key}
                                    name={key as any}
                                    control={control}
                                    render={({ field: rhfField }) => {

                                        if (field.type === 'text') {
                                            return (
                                                <Input
                                                    {...rhfField}
                                                    id={key}
                                                    label={field.label}
                                                    size="small"
                                                    placeholder={field.placeholder}
                                                    errorMessage={error}
                                                    invalid={!!error}
                                                />
                                            );
                                        }

                                        if (field.type === 'file') {
                                            // Extraemos 'value' y 'onChange' de rhfField
                                            const { value, onChange, ...restRhfField } = rhfField;

                                            // Asegurarnos de que files sea siempre un arreglo de File
                                            let filesArray: File[] = [];
                                            if (Array.isArray(value)) {
                                                filesArray = value;
                                            } else if (typeof window !== 'undefined' && (value as any) instanceof FileList) {
                                                filesArray = Array.from(value as any);
                                            } else if (value) {
                                                filesArray = [value as any];
                                            }

                                            return (
                                                <FileUpload
                                                    {...restRhfField}
                                                    id={key}
                                                    label={field.label}
                                                    size="small"
                                                    files={filesArray}
                                                    onChangeFiles={(files) => {
                                                        onChange(files.length > 0 ? files[0] : '');
                                                    }}
                                                    errorMessage={error}
                                                    invalid={!!error}
                                                />
                                            );
                                        }

                                        if (field.type === 'textarea') {
                                            return (
                                                <TextArea
                                                    {...rhfField}
                                                    id={key}
                                                    label={field.label}
                                                    size="small"
                                                    rows={4}
                                                    placeholder={field.placeholder}
                                                    errorMessage={error}
                                                    invalid={!!error}
                                                />
                                            );
                                        }

                                        if (field.type === 'number') {
                                            return (
                                                <InputNumber
                                                    {...rhfField}
                                                    id={key}
                                                    label={field.label}
                                                    size="small"
                                                    min={field.min}
                                                    max={field.max}
                                                    onChangeValue={(value) => rhfField.onChange(value)}
                                                    errorMessage={error}
                                                    invalid={!!error}
                                                />
                                            );
                                        }

                                        if (field.type === 'boolean') {
                                            return (
                                                <div className={styles.checkboxWrapper}>
                                                    <Checkbox
                                                        id={key}
                                                        name={key}
                                                        label={field.label}
                                                        size="small"
                                                        checked={!!rhfField.value}
                                                        onCheckedChange={rhfField.onChange}
                                                    />
                                                </div>
                                            );
                                        }

                                        if (field.type === 'select' && field.options) {
                                            return (
                                                <div className={styles.selectWrapper}>
                                                    <label className={styles.selectLabel}>{field.label}</label>
                                                    <select
                                                        id={key}
                                                        className={`${styles.select} ${error ? styles.selectError : ''}`}
                                                        {...rhfField}
                                                    >
                                                        <option value="">{field.placeholder || 'Selecciona una opción'}</option>
                                                        {field.options.map((opt) => (
                                                            <option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {error && <span className={styles.errorMsg}>{error}</span>}
                                                </div>
                                            );
                                        }

                                        return <></>;
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Footer de acciones */}
                    <Divider spacing={0} />
                    <div className={styles.footer}>
                        <Button
                            label="Cancelar"
                            variant="soft"
                            color="neutral"
                            size="small"
                            onClick={handleClose}
                            type="button"
                        />
                        <Button
                            label={isLoading ? 'Guardando...' : 'Guardar cambios'}
                            variant="solid"
                            size="small"
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
