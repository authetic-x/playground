import React, { useEffect, useMemo, useState } from "react";
import { InitializeController, initializeController } from "./index";

export function useSelector<ReturnType>(
  selector: (initializer: InitializeController) => ReturnType
): ReturnType | undefined {
  const [data, setData] = useState<ReturnType>();

  useEffect(() => {
    setData(selector(initializeController));
  }, [setData]);

  return data;
}
