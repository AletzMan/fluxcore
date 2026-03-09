"use client";
import { Divider, NavigationMenuData, Tooltip } from 'lambda-ui-components';
import styles from './Sidebar.module.scss'
import Link from 'next/link';
import { CloseSession } from './CloseSession';
import { ArrowLeftSquare, UserStar } from 'lucide-react';
import { Icon } from '../../Icon';
import { useMainMenuStore } from '@/pp/store/mainmenu.store';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';


interface SidebarProps {
    menuData: NavigationMenuData[];
    title: string;
}

export const Sidebar = ({ menuData, title }: SidebarProps) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const pathname = usePathname();
    const { open, setOpen } = useMainMenuStore();

    const currentPath = pathname.split("/").slice(0, 3).join("/");

    const handleCloseSidebar = () => {
        if (open || openSidebar) {
            setOpenSidebar(false);
            setOpen(false);
        }
    };

    const sidebarRef = useClickOutside<HTMLDivElement>(handleCloseSidebar);

    const handleLinkClick = () => {
        setOpenSidebar(false);
        setOpen(false);
    };

    return (
        <div ref={sidebarRef} className={`${styles.sidebar} ${open ? styles.sidebar_open : ""} ${openSidebar ? styles.sidebar_open_desktop : ""}`}>
            <div>
                <div className={`${styles.header} ${(open || openSidebar) ? styles.header_open : ""}`}>
                    <div className={styles.logo}>
                        <Icon icon={UserStar} size={25} />
                    </div>
                    <h3> {title}</h3>
                    <button className={styles.toggle_btn} onClick={() => setOpenSidebar(!openSidebar)}>
                        <Icon icon={ArrowLeftSquare} size={27} />
                    </button>
                </div>
                <Divider />
                {
                    menuData.map((item) => (
                        <Fragment key={item.id}>
                            {!openSidebar ? <Tooltip content={item.label} color="neutral" position='right-center' radius="small">
                                <Link
                                    className={`${styles.link} ${item.path === currentPath ? styles.active : ""}`}
                                    href={item.path || ""}
                                    onClick={handleLinkClick}
                                > {item.icon} <span>{item.label}</span></Link>
                            </Tooltip> : <Link
                                className={`${styles.link} ${item.path === currentPath ? styles.active : ""}`}
                                href={item.path || ""}
                                onClick={handleLinkClick}
                            > {item.icon} <span>{item.label}</span></Link>}

                            {item.children && (
                                <div className={styles.group_divider}>
                                    <span className={styles.group_divider_text}>{item.children[0].label}</span>
                                    <div className={styles.group_divider_line}></div>
                                </div>
                            )}
                        </Fragment>
                    ))
                }
            </div>
            {openSidebar ?
                <CloseSession />
                :
                <Tooltip content={"Cerrar sesión"} color="neutral" position='right-center' radius="small">
                    <CloseSession />
                </Tooltip>
            }
        </div>
    );
}
