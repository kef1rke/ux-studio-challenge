import React, { ReactNode, ReactElement } from "react";
import styles from "./components.module.css";
import Spinner from "./loader/Spinner";

interface CustomLinkProps {
    onClick?: () => void;
    icon?: ReactElement;
    label?: string;
    shape?: "primary" | "secondary" | "justIcon" | "shapeless";
    color?: "ghost" | "regular";
    children?: ReactNode;
    type?: "button" | "submit" | "reset";
    stayActive?: boolean;
    customClass?: string;
    style?: React.CSSProperties;
    isLoading?: boolean;
}

const LabelButton: React.FC<CustomLinkProps> = ({
    onClick,
    icon,
    label,
    shape = "secondary",
    color = "regular",
    children,
    type,
    customClass,
    style,
    isLoading = false,
}) => {
    const shapeToStyle = {
        primary: styles.primaryButton,
        secondary: styles.secondaryButton,
        justIcon: styles.justIconButton,
        shapeless: styles.shapelessButton,
    };

    const shapeStyle = shapeToStyle[shape] || styles.secondaryButton;

    return (
        <button
            className={[
                shapeStyle,
                color === "ghost" ? styles.ghostButton : null,
                customClass || "",
            ].join(" ")}
            onClick={onClick}
            type={type}
            style={style}
        >
            {isLoading ? (<Spinner customClass={styles.spinner} />) : (
                <>
                    {icon ? (<span className={styles.icon}>{icon}</span>) : null}
                    {icon && label ? <span className={styles.separator}></span> : null}
                    {label ? <span className={styles.label}>{label}</span> : null}
                    {children}
                </>
            )}
        </button>
    );
};

export default LabelButton;
