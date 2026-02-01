import { LogoFluxCore } from "./LogoFluxCore";
import styles from "./logos.module.scss";


export function LogoFluxCoreLarge({ width, height }: { width: number; height: number }) {
    return (
        <div className={styles["logo-fluxcore-large"]}>
            <LogoFluxCore width={width} height={height} />
            <h1>FluxCore</h1>
        </div>
    );
} 