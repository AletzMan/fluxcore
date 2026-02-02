
import { Divider } from "lambda-ui-components";
import styles from "./Adminpage.module.scss";
import { KipCard } from "@/app/components/ui/KipCard/KipCard";

export default function AdminPage() {
    return (
        <div className={styles.container}>
            <header className={styles.container_header}>
                <h1>Panel de control global</h1>
                <span>Vista general del rendimiento del ecosistema FluxCore </span>
            </header>
            <Divider spacing={20} />
            <div className={styles.container_kips}>
                <KipCard type="revenue" value={4365.56} percentage={0.35} trend="up" />
                <KipCard type="tenants" value={37} percentage={0.12} trend="down" />
                <KipCard type="subscriptions" value={43} percentage={0.05} trend="up" />
                <KipCard type="churnRate" value={0.05} percentage={0.26} trend="down" />
                <KipCard type="apiCalls" value={1365} />
                {/*<KipCard type="salesToday" value={1365.56} percentage={0.16} trend="up" />
                <KipCard type="averageTicket" value={1365.56} percentage={0.08} trend="down" />
                <KipCard type="newCustomers" value={165} percentage={0.45} trend="up" />
                <KipCard type="totalCustomers" value={865} />
                <KipCard type="stockAlerts" value={12} />*/}
            </div>
        </div>
    );
}

