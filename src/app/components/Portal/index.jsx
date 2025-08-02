// components/ModalPortal.js
"use client"; // Important for App Router

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render on the server
  }

  const portalRoot = document.getElementById("portal-root"); // Get your target DOM node
  console.log("Portal root element:", portalRoot);

  if (!portalRoot) {
    return null; // Handle case where portal root is not found
  }

  return createPortal(children, portalRoot);
}
