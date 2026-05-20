import { Provider } from "react-redux";
import { type ReactNode } from "react";

import { store } from "@/app/store";

type Props = {
  children: ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
