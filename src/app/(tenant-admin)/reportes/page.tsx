import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function ReportsPage() {
    return (
        <ContainerSection
            title="Reportes y Analíticas"
            description="Visualiza reportes detallados y métricas clave de tu negocio con exportación a PDF."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de reportes aquí */}
            </div>
        </ContainerSection>
    );
}
