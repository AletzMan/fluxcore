"use client";
import { Button } from "lambda-ui-components";
import styles from "./EditSection.module.scss";
import { EditIcon } from "lucide-react";
import { useEditSectionStore } from "@/app/store/editsection.store";

interface EditSectionProps {
    /** ID de la sección que este botón abre */
    sectionId: string;
}

export const EditSection = ({ sectionId }: EditSectionProps) => {
    const openSection = useEditSectionStore((s) => s.openSection);
    return (
        <div className={styles.editSection}>
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
