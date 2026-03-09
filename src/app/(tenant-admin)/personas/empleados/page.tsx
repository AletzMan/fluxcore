import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function EmpleadosPage() {
    return (
        <ContainerSection
            title="Colaboradores y Empleados"
            description="Administra los perfiles y permisos de tu equipo de trabajo."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de empleados aquí */}
            </div>
        </ContainerSection>
    );
}
