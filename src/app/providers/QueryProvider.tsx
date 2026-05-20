import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const QueryProvider = ({ children }: Props) => {
  return <>{children}</>;
};

export default QueryProvider;
