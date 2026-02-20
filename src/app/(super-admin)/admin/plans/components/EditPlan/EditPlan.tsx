"use client";
import { Button } from "lambda-ui-components";
import styles from "./EditPlan.module.scss";
import { EditIcon } from "lucide-react";
import { useEditPlanStore } from "@/app/store/editplan.store";

interface EditPlanProps {
    /** ID de la sección que este botón abre */
    sectionId: string;
}

export const EditPlan = ({ sectionId }: EditPlanProps) => {
    const openSection = useEditPlanStore((s) => s.openSection);
    return (
        <div className={styles.editPlan}>
            <Button
                icon={<EditIcon />}
                variant="outline"
                size="tiny"
                radius="small"
                onClick={() => openSection(sectionId)}
            />
        </div>
    );
}