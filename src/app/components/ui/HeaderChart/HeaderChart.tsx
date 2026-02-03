import { Dropdown } from 'lambda-ui-components';
import styles from './HeaderChart.module.scss'
import { toSvg, toPng, toJpeg } from "html-to-image"
import { DownloadIcon, SaveIcon } from 'lucide-react';

interface HeaderChartProps {
    title: string;
    description: string;
    refChart: React.RefObject<HTMLDivElement | null>;
}

export const HeaderChart = ({ title, description, refChart }: HeaderChartProps) => {

    const handleDownload = (format: "png" | "jpeg" | "svg") => {
        if (!refChart?.current) return;
        switch (format) {
            case "png":
                toPng(refChart.current, { filter: (node) => node.tagName !== "BUTTON" })
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.download = "chart.png";
                        link.href = dataUrl;
                        link.click();
                    })
                    .catch((err) => {
                        console.error("Error al descargar el gráfico:", err);
                    });
                break;
            case "jpeg":
                toJpeg(refChart.current, { filter: (node) => node.tagName !== "BUTTON" })
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.download = "chart.jpeg";
                        link.href = dataUrl;
                        link.click();
                    })
                    .catch((err) => {
                        console.error("Error al descargar el gráfico:", err);
                    });
                break;
            case "svg":
                toSvg(refChart.current, { filter: (node) => node.tagName !== "BUTTON" })
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.download = "chart.svg";
                        link.href = dataUrl;
                        link.click();
                    })
                    .catch((err) => {
                        console.error("Error al descargar el gráfico:", err);
                    });
                break;
        }
    }

    return (
        <header className={styles.header}>
            <div>
                <h2>{title}</h2>
                <span>{description}</span>
            </div>
            <Dropdown icon={<DownloadIcon strokeWidth={1.8} absoluteStrokeWidth />} size="small">
                <Dropdown.Item icon={<SaveIcon />} text="Save as PNG" onSelectOption={() => handleDownload("png")} />
                <Dropdown.Item icon={<SaveIcon />} text="Save as JPEG" onSelectOption={() => handleDownload("jpeg")} />
                <Dropdown.Item icon={<SaveIcon />} text="Save as SVG" onSelectOption={() => handleDownload("svg")} />
            </Dropdown>
        </header>
    );
}
