import Link from "next/link";
import { Button } from "lambda-ui-components";
import { ArrowRight, BarChart3, Box, ShieldCheck, CreditCard, Zap, Users, Clock } from "lucide-react";
import { LogoFluxCoreLarge } from "./components/logos/LogoFluxCoreLarge";
import { PricingSection } from "./components/landing/PricingSection";
import { FeaturesShowcase } from "./components/landing/FeaturesShowcase";
import styles from "./page.module.scss";
import { planService } from "@/app/services/api/plan.service";
import { Plan } from "@/typesModels/Plan";

export default async function Home() {
  const plansResponse = await planService.getActivePlans();
  const plans = (plansResponse?.data || []).sort((a: Plan, b: Plan) => a.monthlyPrice - b.monthlyPrice);

  return (
    <div className={styles.page}>

      {/* --- Navegación --- */}
      <nav className={styles.navbar}>
        <LogoFluxCoreLarge width={28} height={28} />
        <div className={styles.navLinks}>
          <Link href="/login">Ingresar</Link>
          <Button color="primary" size="small" >
            <Link href="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
              Registrarse
            </Link>
          </Button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <Zap size={14} />
            Nuevo · Prueba gratuita disponible
          </span>
          <h1>
            El corazón de tu negocio, en <span className={styles.highlight}>flujo constante.</span>
          </h1>
          <p>
            Plataforma ERP completa para la gestión de puntos de venta, control de inventario y análisis de tu operación.
            Elegante, rápido y en la nube.
          </p>
          <div className={styles.ctaGroup}>
            <Button color="primary" size="large" radius="large">
              <Link href="/register" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Comenzar gratis
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button color="neutral" variant="outline" size="large" radius="large">
              <Link href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                Ir al Dashboard
              </Link>
            </Button>
          </div>
          <p className={styles.trialNote}>
            <CreditCard size={16} />
            Prueba gratuita · No se requiere tarjeta de crédito
          </p>
        </div>
      </main>

      {/* --- Stats / Social Proof --- */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}><Users size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Negocios activos</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <div className={styles.statIcon}><BarChart3 size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>1M+</span>
            <span className={styles.statLabel}>Ventas procesadas</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <div className={styles.statIcon}><Clock size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>Uptime garantizado</span>
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section className={styles.features}>
        <h2>Todo lo que necesitas para crecer</h2>
        <p className={styles.sectionSubtitle}>
          Herramientas potentes y fáciles de usar, diseñadas para que tu negocio opere sin fricción.
        </p>
        <div className={styles.featuresGrid}>

          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Box size={24} />
            </div>
            <h3>Inventario Inteligente</h3>
            <p>
              Control total de existencias en tiempo real, alertas de stock mínimo y órdenes de compra automáticas.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <BarChart3 size={24} />
            </div>
            <h3>Punto de Venta (POS)</h3>
            <p>
              Ventas rápidas, ágiles y con interfaces optimizadas para cajeros.
              Soporte para múltiples métodos de pago y facturación.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <ShieldCheck size={24} />
            </div>
            <h3>Administración y Reportes</h3>
            <p>
              Roles y permisos avanzados, auditoría completa y generación de analíticas de manera centralizada y segura.
            </p>
          </div>

        </div>
      </section>

      {/* --- Capturas de App (Showcase) --- */}
      <FeaturesShowcase />

      {/* --- Planes y Precios --- */}
      <PricingSection plans={plans} />

      {/* --- CTA Final --- */}
      <section className={styles.ctaFinal}>
        <h2>¿Listo para transformar tu negocio?</h2>
        <p>Comienza tu prueba gratuita hoy. Sin compromiso, sin tarjeta de crédito.</p>
        <Button color="primary" size="large" radius="large">
          <Link href="/register" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Comenzar gratis
            <ArrowRight size={18} />
          </Link>
        </Button>
        <span className={styles.ctaTrialNote}>
          <CreditCard size={14} />
          No se requiere tarjeta de crédito
        </span>
      </section>

      {/* --- Footer --- */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <LogoFluxCoreLarge width={24} height={24} />
          <p>Plataforma ERP en la nube para punto de venta, inventario y administración de tu negocio.</p>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} FluxCore. Todos los derechos reservados.</span>
          <div className={styles.footerLinks}>
            <Link href="#">Privacidad</Link>
            <Link href="#">Términos</Link>
            <Link href="#">Contacto</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
