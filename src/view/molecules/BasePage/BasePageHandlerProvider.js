import { createContext, useContext } from "react";

const BasePageHandlerProviderContext = createContext();

export default function BasePageHandlerProvider({ children, value }) {
  return (
    <BasePageHandlerProviderContext.Provider value={value}>
      {children}
    </BasePageHandlerProviderContext.Provider>
  );
}

export const useBasePageHandlerContext = () => {
  return useContext(BasePageHandlerProviderContext);
};
