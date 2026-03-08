import { NavigationMenuData } from "lambda-ui-components";
import { HeaderSection } from "../components/layout/HeaderSection/HeaderSection";
import { Sidebar } from "../components/layout/Sidebar/Sidebar";
import styles from "./tenant.module.scss";
import { LayoutDashboard, ShoppingCart, Box, BarChart3, Settings } from "lucide-react";

export default function TenantAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={styles.main}>
            <HeaderSection>
                <p>{""}</p>
            </HeaderSection>
            <div className={styles.content}>
                <Sidebar
                    menuData={menuData}
                    title="Panel de control"
                />
                <section className={styles["content_section"]}>
                    {children}
                </section>
            </div>
        </main>
    );
}

const menuData: NavigationMenuData[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={25} absoluteStrokeWidth />
    },
    {
        id: "sales",
        label: "Ventas (POS)",
        path: "/ventas/pos",
        icon: <ShoppingCart size={25} absoluteStrokeWidth />
    },
    {
        id: "inventory",
        label: "Inventario",
        path: "/inventario",
        icon: <Box size={25} absoluteStrokeWidth />
    },
    {
        id: "reports",
        label: "Reportes",
        path: "/reportes",
        icon: <BarChart3 size={25} absoluteStrokeWidth />
    },
    {
        id: "settings",
        label: "Configuración",
        path: "/configuracion/empresa",
        icon: <Settings size={25} absoluteStrokeWidth />
    }
];
