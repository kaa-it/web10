import {CSSProperties, ReactNode} from "react";
import {axis2D, fillArray} from "../../lib/utils";
import clsx from "clsx";

export interface GridCSS extends CSSProperties {
    "--w": number;
    "--h": number;
}

type CellCallbackProps = {
    x: number;
    y: number;
    index: number;
};

type GridProps = {
    tag: keyof HTMLElementTagNameMap;
    width: number;
    height: number;
    className: string;
    children: (props: CellCallbackProps) => ReactNode;
};

export const Grid = ({
                         tag,
                         width,
                         height,
                         className,
                         children,
                     }: GridProps) => {
    const Tag = tag as any;
    const cells: string[] = fillArray(width * height, "");

    return (
        <Tag
            className={className}
            style={
                {
                    "--w": width,
                    "--h": height,
                } as GridCSS
            }
        >
            {cells.map((_, index) => {
                const [x, y] = axis2D(index, width);
                return children({x, y, index});
            })}
        </Tag>
    );
};