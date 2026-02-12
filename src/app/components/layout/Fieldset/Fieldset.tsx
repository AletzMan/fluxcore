import styles from './Fieldset.module.scss'

interface FieldsetProps {
    title: string;
    children: React.ReactNode;
}

export const Fieldset = ({ title, children }: FieldsetProps) => {
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.fieldset_legend}>{title}</legend>
            <div className={styles.fieldset_content}>
                {children}
            </div>
        </fieldset>
    );
}
