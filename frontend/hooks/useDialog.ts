import { useState } from "react";

type ResolveFunction = (value: boolean) => void;

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resolvePromise, setResolvePromise] = useState<ResolveFunction | null>(
    null
  );

  const openDialog = (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setIsOpen(true);
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = (): void => {
    if (resolvePromise) {
      resolvePromise(true);
    }
    setIsOpen(false);
  };

  const handleCancel = (): void => {
    if (resolvePromise) {
      resolvePromise(false);
    }
    setIsOpen(false);
  };

  return {
    isOpen,
    openDialog,
    handleConfirm,
    handleCancel,
  } as const;
};
