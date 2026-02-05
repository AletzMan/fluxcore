import { LogoFluxCoreLarge } from "../../logos/LogoFluxCoreLarge";
import styles from "./Header.module.scss";

export function Header() {
    return (
        <header className={styles.header}>
            <LogoFluxCoreLarge width={60} height={60} />
        </header>
    );
}