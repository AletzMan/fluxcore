import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormCustomer } from "../../nuevo/components/FormCustomer/FormCustomer";
import { customerService } from "@/app/services/api/customer.service";
import styles from "../../CustomerPage.module.scss";
import { Link } from "lambda-ui-components";
import { MoveLeft } from "lucide-react";

export default async function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let customer = null;
    let isError = false;

    try {
        customer = await customerService.getCustomerById(Number(id));
    } catch (error) {
        isError = true;
    }

    if (isError || !customer) {
        return (
            <ContainerSection
                title="Cliente no encontrado"
                description="El cliente que intentas editar no existe o hubo un error."
            >
                <div style={{ display: 'flex', paddingTop: '1rem' }}>
                    <Link
                        href="/personas/clientes"
                        icon={<MoveLeft />}
                        label="Regresar a Clientes"
                        variant="subtle"
                    />
                </div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title={`Editar Cliente: ${customer.firstName} ${customer.lastName}`}
            description="Actualiza la información personal, de contacto o datos fiscales de tu cliente."
        >
            <div className={styles.container}>
                <FormCustomer customer={customer} />
            </div>
        </ContainerSection>
    );
}
