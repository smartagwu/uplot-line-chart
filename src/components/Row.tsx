import { PropsWithChildren } from "react";

const Row = ({ children }: PropsWithChildren) => (
  <div className="row">{children}</div>
);
export default Row;
