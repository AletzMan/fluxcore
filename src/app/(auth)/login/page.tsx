import { Button, Flex, Input, Divider } from "lambda-ui-components";
import styles from "../auth.module.scss";
import { RectangleEllipsis, User2, UserCircle2 } from "lucide-react";
import { Icon } from "@/app/components/Icon";

export default function LoginPage() {
    return (
        <div className={styles["login_page"]}>
            <div>
                <Icon icon={UserCircle2} size={80} />
                <h1>Bienvendido</h1>
                <p>Por favor, ingresa tus credenciales para iniciar sesión</p>
                <form className={styles["login_form"]} action="">
                    <Input placeholder="Juan Pérez" label="Usuario" prefix={<Icon icon={User2} />} />
                    <Input placeholder="Introduce tu contraseña" type="password" prefix={<Icon icon={RectangleEllipsis} />} label="Contraseña" />
                    <Divider spacing={20} />
                    <Button color="primary" size="medium" block>Iniciar sesión</Button>
                </form>
            </div>
        </div>
    );
}