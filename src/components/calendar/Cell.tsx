import { ReactNode } from "react";
import { pointToString } from "../../lib/utils";
import clsx from "clsx";

type CellProps = {
    tag: keyof HTMLElementTagNameMap;
    x: number;
    y: number;
    className?: string;
    children: ReactNode;
};

export const Cell = ({ tag, x, y, className, children }: CellProps) => {
    const Tag = tag as any;

    return (
        <Tag className={clsx("cell", className)} data-x={x} data-y={y}>
            {children}
        </Tag>
    );
};