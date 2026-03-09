import { NavigationMenuData } from "lambda-ui-components";
import { HeaderSection } from "../components/layout/HeaderSection/HeaderSection";
import { Sidebar } from "../components/layout/Sidebar/Sidebar";
import styles from "./tenant.module.scss";
import { LayoutDashboard, ShoppingCart, Box, BarChart3, Settings, ArrowLeftRight, User, Truck, ShoppingBag, Contact2Icon, UserCog, Contact, Boxes, Award, Tags, Layers, Package, Wallet } from "lucide-react";

export default function TenantAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={styles.main}>
            <HeaderSection>
                <p>{""}</p>
            </HeaderSection>
            <div className={styles.content}>
                <Sidebar
                    menuData={menuData}
                    title="FluxCore"
                />
                <section className={styles["content_section"]}>
                    {children}
                </section>
            </div>
        </main>
    );
}

const menuData: NavigationMenuData[] = [
    // 1. OPERACIONES
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Operaciones",
            }
        ]
    },
    {
        id: "sales",
        label: "Ventas",
        path: "/operaciones/ventas",
        icon: <ShoppingCart size={25} absoluteStrokeWidth />
    },
    {
        id: "cashSessions",
        label: "Caja",
        path: "/operaciones/caja",
        icon: <Wallet size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Catálogo",
            }
        ]
    },

    // 2. CATÁLOGO
    {
        id: "products",
        label: "Productos",
        path: "/catalogo/productos",
        icon: <Package size={25} absoluteStrokeWidth />
    },
    {
        id: "categories",
        label: "Categorías",
        path: "/catalogo/categorias",
        icon: <Tags size={25} absoluteStrokeWidth />
    },
    {
        id: "brands",
        label: "Marcas",
        path: "/catalogo/marcas",
        icon: <Award size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Almacén",
            }
        ]
    },

    // 3. ALMACÉN
    {
        id: "inventory",
        label: "Inventario",
        path: "/almacen/inventario",
        icon: <Boxes size={25} absoluteStrokeWidth />
    },
    {
        id: "movements",
        label: "Movimientos",
        path: "/almacen/movimientos",
        icon: <ArrowLeftRight size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Personas",
            }
        ]
    },

    // 4. PERSONAS
    {
        id: "customers",
        label: "Clientes",
        path: "/personas/clientes",
        icon: <Contact size={25} absoluteStrokeWidth />
    },
    {
        id: "providers",
        label: "Proveedores",
        path: "/personas/proveedores",
        icon: <Truck size={25} absoluteStrokeWidth />
    },
    {
        id: "employees",
        label: "Empleados",
        path: "/personas/empleados",
        icon: <UserCog size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Control",
            }
        ]
    },

    // 5. CONTROL
    {
        id: "reports",
        label: "Reportes",
        path: "/reportes",
        icon: <BarChart3 size={25} absoluteStrokeWidth />
    },
    {
        id: "settings",
        label: "Configuración",
        path: "/configuracion",
        icon: <Settings size={25} absoluteStrokeWidth />
    }
];
