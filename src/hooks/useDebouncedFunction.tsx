// src/hooks/useDebouncedFunction.ts
import { useMemo } from "react";
import { debounce } from "lodash";

export const useDebouncedFunction = (callback: (...args: string[]) => void, delay: number) => {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
};
