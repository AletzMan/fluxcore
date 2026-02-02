import { NavigationMenu, NavigationMenuData } from 'lambda-ui-components';
import styles from './Sidebar.module.scss'

interface SidebarProps {
    menuData: NavigationMenuData[];
    currentPath: string;
}

export const Sidebar = ({ menuData, currentPath }: SidebarProps) => {
    return (
        <div className={styles.sidebar}>
            <NavigationMenu
                data={menuData}
                currentPath={currentPath}
                size="large" showLines
            />
        </div>
    );
}
