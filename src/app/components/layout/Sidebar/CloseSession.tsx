"use client";
import { useAuth } from "@/hooks/useAuth";
import { DoorOpen } from "lucide-react";
import styles from "./Sidebar.module.scss";

export const CloseSession = () => {
    const { logout, isLoading } = useAuth();
    return (
        <button
            className={`${styles.link} ${styles.link_logout}`}
            onClick={() => logout()}
            disabled={isLoading}
        >
            <DoorOpen size={25} absoluteStrokeWidth />
            <span> Cerrar sesión</span>
        </button>
    );
}