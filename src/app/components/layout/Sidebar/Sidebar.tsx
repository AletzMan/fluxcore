import { Divider, NavigationMenuData } from 'lambda-ui-components';
import styles from './Sidebar.module.scss'
import Link from 'next/link';
import { CloseSession } from './CloseSession';
import { UserStar } from 'lucide-react';
import { Icon } from '../../Icon';

interface SidebarProps {
    menuData: NavigationMenuData[];
    currentPath: string;
    title: string;
}

export const Sidebar = ({ menuData, currentPath, title }: SidebarProps) => {
    return (
        <div className={styles.sidebar}>
            <div>
                <div>
                    <Icon icon={UserStar} size={25} />
                    <h3> {title}</h3>
                </div>
                <Divider />
                {
                    menuData.map((item) => (
                        <Link
                            className={`${styles.link} ${item.path === currentPath ? styles.active : ""}`}
                            key={item.id}
                            href={item.path || ""}
                        > {item.icon} <span>{item.label}</span></Link>
                    ))
                }
            </div>
            <CloseSession />
        </div>
    );
}
