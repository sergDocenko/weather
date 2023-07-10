"use client";

import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  selector: string;
};

const Portal: FC<PortalProps> = ({ children, selector }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector(selector)??document.body)
    : null;
};

export default Portal;
