import { createContext, useContext } from "react";

const BasePageHandlerProviderContext = createContext();

export default function BasePageHandlerProvider({ children, handlers }) {
  return (
    <BasePageHandlerProviderContext.Provider value={handlers}>
      {children}
    </BasePageHandlerProviderContext.Provider>
  );
}

export const useBasePageHandlerContext = function () {
  return useContext(BasePageHandlerProviderContext);
};
