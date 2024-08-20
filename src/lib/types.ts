// # Общие типы

// Координаты, для удобства переименованы чтобы не путать.
export type XAxis = number; 
export type YAxis = number;
export type Point = [XAxis, YAxis];

// Но если нужно обеспечить "жесткую" несовместимость, 
// можно сделать "брендированными"
// export type X = number & { __brand: "X"};
// export type Y = number & { __brand: "Y"};
// export const xy = (x: number, y: number): Point => [x as X, y as Y];

export type Size = number;

// Фигура это набор точек
export type Shape = Point[];
// Но можно сделать ее шаблон в виде функции,
// которая будет считать точки относительно стартовой
export type ShapeGenerator = (x: XAxis, y: YAxis) => Shape;

