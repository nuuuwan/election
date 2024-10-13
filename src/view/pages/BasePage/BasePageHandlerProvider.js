import { createContext, useContext } from "react";
import CustomLoadingProgress from "../../base/CustomLoadingProgress";

const BasePageHandlerProviderContext = createContext();

export default function BasePageHandlerProvider({ children, handlers }) {
  return (
    <BasePageHandlerProviderContext.Provider value={handlers}>
      {handlers ? children : <CustomLoadingProgress />}
    </BasePageHandlerProviderContext.Provider>
  );
}

export const useBasePageHandlerContext = function () {
  return useContext(BasePageHandlerProviderContext);
};
