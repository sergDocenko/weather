import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  container?: DocumentFragment;
};

export const Portal: FC<PortalProps> = ({ children, container = document.body }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, container) : null;
};


