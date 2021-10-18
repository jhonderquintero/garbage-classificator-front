import React, { ReactChildren, ReactNode } from "react";

export const GridWrapper: React.FC<IGridWrapper> = ({
  children,
}): JSX.Element => {
  return <div className="grid grid-cols-12 gap-2">{children}</div>;
};

interface IGridWrapper {
  children: ReactChildren | ReactNode;
}
