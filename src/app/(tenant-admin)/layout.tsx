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
    // 1. LO QUE DEJA LANA Y SE USA DIARIO
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Caja y Ventas",
            }
        ]
    },
    {
        id: "sales",
        label: "Ventas",
        path: "/ventas",
        icon: <ShoppingCart size={25} absoluteStrokeWidth />
    },
    {
        id: "cashSessions", // Lo subimos porque el corte de caja es de todos los días
        label: "Cortes de Caja",
        path: "/caja/sesiones",
        icon: <Wallet size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Catálogo y Almacén",
            }
        ]
    },

    // 2. EL CATÁLOGO (Lo que vendes)
    {
        id: "products", // Más amigable que "Productos Maestros"
        label: "Productos",
        path: "/catalogo/productos",
        icon: <Package size={25} absoluteStrokeWidth />
    },
    {
        id: "productVariants",
        label: "Variantes",
        path: "/catalogo/variantes",
        icon: <Layers size={25} absoluteStrokeWidth /> // Capas, para las tallas o colores
    },
    {
        id: "categories",
        label: "Categorías",
        path: "/catalogo/categorias",
        icon: <Tags size={25} absoluteStrokeWidth /> // Etiquetas
    },
    {
        id: "brands",
        label: "Marcas",
        path: "/catalogo/marcas",
        icon: <Award size={25} absoluteStrokeWidth /> // Una medallita o estrellita
    },

    // 3. LOS FIERROS DEL ALMACÉN
    {
        id: "inventory",
        label: "Inventario",
        path: "/almacen/inventario",
        icon: <Boxes size={25} absoluteStrokeWidth /> // Cajas en plural
    },
    {
        id: "movements",
        label: "Movimientos",
        path: "/almacen/movimientos",
        icon: <ArrowLeftRight size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Contactos",
            }
        ]
    },

    // 4. LA BANDA (Tus contactos)
    {
        id: "customers",
        label: "Clientes",
        path: "/contactos/clientes",
        icon: <Contact size={25} absoluteStrokeWidth /> // La agenda
    },
    {
        id: "providers",
        label: "Proveedores",
        path: "/contactos/proveedores",
        icon: <Truck size={25} absoluteStrokeWidth /> // El camioncito que acordamos
    },
    {
        id: "employees",
        label: "Empleados",
        path: "/contactos/empleados",
        icon: <UserCog size={25} absoluteStrokeWidth />,
        children: [
            {
                id: "0",
                label: "Administración",
            }
        ]
    },

    // 5. EL PAPELEO Y AJUSTES (Hasta el fondo)
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
