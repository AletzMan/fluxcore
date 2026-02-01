import { Button, Flex, Input, Divider } from "lambda-ui-components";
import styles from "../auth.module.scss";

export default function LoginPage() {
    return (
        <div className={styles["login_page"]}>
            <div>
                <h1>Bienvendido</h1>
                <p>Por favor, ingresa tus credenciales para iniciar sesión</p>
                <form className={styles["login_form"]} action="">
                    <Input placeholder="Juan Pérez" label="Usuario" />
                    <Input placeholder="Introduce tu contraseña" type="password" label="Contraseña" />
                    <Divider spacing={20} />
                    <Button color="primary" size="medium" block>Iniciar sesión</Button>
                </form>
            </div>
        </div>
    );
}