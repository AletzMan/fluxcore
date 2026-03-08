import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import styles from "./FeaturesShowcase.module.scss";

export function FeaturesShowcase() {
    return (
        <section className={styles.showcase}>
            <div className={styles.showcaseHeader}>
                <h2>Potencia cada rincón de tu negocio</h2>
                <p>
                    Descubre cómo nuestra plataforma unificada te ayuda a gestionar ventas,
                    controlar tu inventario y administrar tu información desde un solo lugar.
                </p>
            </div>

            <div className={styles.featureBlock}>
                <div className={styles.featureContent}>
                    <div className={styles.badge}>Punto de Venta (POS)</div>
                    <h3>Vende más rápido y sin complicaciones</h3>
                    <p>
                        Nuestro módulo de Punto de Venta está diseñado para la velocidad.
                        Atiende a tus clientes ágilmente, maneja múltiples sesiones de caja y
                        sincroniza tus ventas al instante con tu inventario.
                    </p>
                    <ul className={styles.featureList}>
                        <li><CheckCircle2 size={18} /> <span>Apertura y cierre de turnos de caja</span></li>
                        <li><CheckCircle2 size={18} /> <span>Búsqueda rápida por código o variante</span></li>
                        <li><CheckCircle2 size={18} /> <span>Facturación electrónica integrada</span></li>
                    </ul>
                    <Link href="/register" className={styles.featureCta}>
                        Probar gratis <ArrowRight size={16} />
                    </Link>
                </div>
                <div className={styles.featureImageWrapper}>
                    <Image
                        src="/screenshots/pos.webp"
                        alt="Punto de Venta Dashboard"
                        width={800}
                        height={600}
                        className={styles.featureImage}
                        unoptimized
                    />
                </div>
            </div>

            <div className={`${styles.featureBlock} ${styles.featureBlockReverse}`}>
                <div className={styles.featureContent}>
                    <div className={styles.badge}>Gestión de Inventario</div>
                    <h3>Control total sobre tu stock</h3>
                    <p>
                        Mantén tu catálogo organizado con control preciso de unidades. Administra variantes de productos, haz seguimiento de movimientos, ajusta niveles y maneja ingresos de mercadería.
                    </p>
                    <ul className={styles.featureList}>
                        <li><CheckCircle2 size={18} /> <span>Productos con múltiples variantes (tallas, colores)</span></li>
                        <li><CheckCircle2 size={18} /> <span>Historial de movimientos y ajustes de stock</span></li>
                        <li><CheckCircle2 size={18} /> <span>Gestión multicategoría y marcas</span></li>
                    </ul>
                    <Link href="/register" className={styles.featureCta}>
                        Probar gratis <ArrowRight size={16} />
                    </Link>
                </div>
                <div className={styles.featureImageWrapper}>
                    <Image
                        src="/screenshots/inventory.webp"
                        alt="Dashboard de Inventario"
                        width={800}
                        height={600}
                        className={styles.featureImage}
                        unoptimized
                    />
                </div>
            </div>

            <div className={styles.featureBlock}>
                <div className={styles.featureContent}>
                    <div className={styles.badge}>Administración y Reportes</div>
                    <h3>Toda la información para tomar decisiones</h3>
                    <p>
                        Diseñado para darte el control total. Genera reportes de ventas detallados, administra a tus empleados y define roles y permisos especializados para tu equipo de trabajo.
                    </p>
                    <ul className={styles.featureList}>
                        <li><CheckCircle2 size={18} /> <span>Reportes gráficos y analíticas de ventas</span></li>
                        <li><CheckCircle2 size={18} /> <span>Administración de empleados y cajeros</span></li>
                        <li><CheckCircle2 size={18} /> <span>Permisos granulares y niveles de usuario</span></li>
                    </ul>
                    <Link href="/register" className={styles.featureCta}>
                        Probar gratis <ArrowRight size={16} />
                    </Link>
                </div>
                <div className={styles.featureImageWrapper}>
                    <div className={styles.placeholderImage}>
                        <div className={styles.glassEffect}>
                            <span>Gestión y Analíticas</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
