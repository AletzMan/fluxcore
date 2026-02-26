"use client";
import styles from './EditFeaturesForm.module.scss';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Alert, Button, Checkbox, Dialog, Divider, Input, TextArea } from 'lambda-ui-components';
import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { updatePlanAction } from '@/app/actions/plan.actions';
import { PlanFeature } from '@/typesAPI/plan.types';


const FeatureSchema = z.object({
    features: z.array(z.object({
        id: z.number().optional(),
        name: z.string().min(1, 'El nombre es requerido'),
        description: z.string().min(1, 'La descripción es requerida'),
        isEnabled: z.boolean(),
        displayOrder: z.number(),
    })),
});

type FeaturesFormValues = z.infer<typeof FeatureSchema>;

interface EditFeaturesFormProps {
    planId: number;
    features: PlanFeature[];
    isOpen: boolean;
    onClose: () => void;
}

export const EditFeaturesForm = ({ planId, features, isOpen, onClose }: EditFeaturesFormProps) => {
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FeaturesFormValues>({
        resolver: zodResolver(FeatureSchema) as any,
        defaultValues: {
            features: features.map((f, i) => ({
                id: f.id,
                name: f.name,
                description: f.description,
                isEnabled: f.isEnabled,
                displayOrder: f.displayOrder ?? i + 1,
            })),
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'features' });

    const onSubmit = async (data: FeaturesFormValues) => {
        setIsLoading(true);
        setStatus(null);
        try {
            const response = await updatePlanAction(planId, data);

            if ((response as any)?.success === false) {
                setStatus({ type: 'error', message: (response as any).message || 'Error al guardar los cambios.' });
                return;
            }

            setStatus({ type: 'success', message: 'Características actualizadas correctamente.' });
            setTimeout(() => {
                setStatus(null);
                onClose();
                window.location.reload();
            }, 1200);
        } catch {
            setStatus({ type: 'error', message: 'Ocurrió un error inesperado. Intenta de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        setStatus(null);
        onClose();
    };

    const addFeature = () => {
        append({
            name: '',
            description: '',
            isEnabled: true,
            displayOrder: fields.length + 1,
        });
    };

    return (
        <Dialog isOpen={isOpen} onClose={handleClose}>
            <div className={`${styles.editfeatures} scrollBar`}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>Editar: Características Adicionales</h2>
                    <p className={styles.description}>
                        Agrega, edita o elimina las características personalizadas de este plan.
                    </p>
                </div>

                <Divider spacing={0} />

                {/* Alert de estado */}
                {status && (
                    <Alert
                        message={status.message}
                        color={status.type === 'success' ? 'success' : 'danger'}
                        onClose={() => setStatus(null)}
                    />
                )}

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    {/* Lista de features */}
                    <div className={styles.featureList}>
                        {fields.map((field, index) => (
                            <div key={field.id} className={styles.featureRow}>
                                <div className={styles.featureFields}>
                                    <Controller
                                        name={`features.${index}.name`}
                                        control={control}
                                        render={({ field: f }) => (
                                            <Input
                                                {...f}
                                                id={`feature-name-${index}`}
                                                label="Nombre"
                                                size="small"
                                                placeholder="Ej. Reportes en tiempo real"
                                                errorMessage={errors.features?.[index]?.name?.message}
                                                invalid={!!errors.features?.[index]?.name}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`features.${index}.description`}
                                        control={control}
                                        render={({ field: f }) => (
                                            <TextArea
                                                {...f}
                                                id={`feature-desc-${index}`}
                                                label="Descripción"
                                                size="small"
                                                rows={2}
                                                placeholder="Breve descripción de la característica..."
                                                errorMessage={errors.features?.[index]?.description?.message}
                                                invalid={!!errors.features?.[index]?.description}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`features.${index}.isEnabled`}
                                        control={control}
                                        render={({ field: f }) => (
                                            <Checkbox
                                                id={`feature-enabled-${index}`}
                                                name={f.name}
                                                label="Habilitada"
                                                size="small"
                                                checked={!!f.value}
                                                onCheckedChange={f.onChange}
                                            />
                                        )}
                                    />
                                </div>
                                <Button
                                    variant="soft"
                                    color="danger"
                                    size="tiny"
                                    icon={<Trash2 size={14} />}
                                    onClick={() => remove(index)}
                                    type="button"
                                />
                            </div>
                        ))}

                        {fields.length === 0 && (
                            <p className={styles.empty}>No hay características adicionales. Agrega una.</p>
                        )}
                    </div>

                    {/* Agregar feature */}
                    <Button
                        label="Agregar Característica"
                        variant="outline"
                        size="small"
                        icon={<Plus size={16} />}
                        onClick={addFeature}
                        type="button"
                    />

                    <Divider spacing={0} />

                    {/* Footer */}
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
