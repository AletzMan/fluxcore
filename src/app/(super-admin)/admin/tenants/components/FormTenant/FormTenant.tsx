"use client";
import { Input, Stepper } from 'lambda-ui-components';
import styles from './FormTenant.module.scss'
import { UserIcon } from 'lucide-react';

export const FormTenant = () => {
    return (
        <div className={styles.formtenant}>
            <Stepper
                defaultActiveStep={0}
                orientation="horizontal"
                variant="bordered"
                steps={[
                    { id: "step-1", title: "Step 1", description: "Step 1", content: <div>Step 1</div>, icon: <UserIcon /> },
                    { id: "step-2", title: "Step 2", description: "Step 2", content: <div>Step 2</div>, icon: <UserIcon /> },
                    { id: "step-3", title: "Step 3", description: "Step 3", content: <div>Step 3</div>, icon: <UserIcon /> },
                ]}
            >
                <Stepper.Step title="Información del comercio" description="Step 1" content={"Step 1"} icon={<UserIcon />} id="step-1" index={0} />
                <Stepper.Step title="Plan y suscripción" description="Step 2" content={"Step 2"} icon={<UserIcon />} id="step-2" index={1} />
                <Stepper.Step title="Usuario administrador" description="Step 3" content={"Step 3"} icon={<UserIcon />} id="step-3" index={2} />
                <Stepper.Content>
                    <form>
                        <Input
                            label="Nombre del comercio"
                            placeholder="Mercado de la plaza"
                            name="name"
                            type="text"
                            required
                        />
                        <Input
                            label='Slug'
                            placeholder='mercado-de-la-plaza'
                            name='slug'
                            type='text'
                            required
                        />
                        <Input
                            label='Email'
                            placeholder='email@domain.com'
                            name='email'
                            type='email'
                            required
                        />
                        <Input
                            label='Teléfono'
                            placeholder='123456789'
                            name='phone'
                            required
                        />
                    </form>
                </Stepper.Content>
            </Stepper>
        </div>
    );
}
