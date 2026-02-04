
"use client";
import { Avatar, ButtonTheme, Divider, SwitchTheme } from 'lambda-ui-components';
import { LogoFluxCoreLarge } from '../../logos/LogoFluxCoreLarge';
import styles from './HeaderSection.module.scss';
import { useAuth } from '@/hooks/useAuth';

export function HeaderSection({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'Super Admin';
            case 'ADMIN':
                return 'Administrador';
            case 'MANAGER':
                return 'Gerente';
            case 'CASHIER':
                return 'Cajero';
            case 'PURCHASING_AGENT':
                return 'Comprador';
            case 'STOCK_CLERK':
                return 'Almacenista';
            default:
                return role;
        }
    };

    return (
        <header className={styles.header_section}>
            <LogoFluxCoreLarge width={30} height={30} />
            <Divider orientation="vertical" />
            <div>
                {children}
                <div>
                    <div className={styles.theme}>
                        <SwitchTheme showLabel size='small' />
                    </div>
                    <Divider orientation="vertical" />
                    <div>
                        <span>{user?.name}</span>
                        <span>{getRoleLabel(user?.role!)}</span>
                    </div>
                    <Avatar
                        name={user?.name! || ""}
                        size="small"
                    />
                </div>
            </div>
        </header>
    );
}
