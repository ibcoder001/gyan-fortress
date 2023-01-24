"use client";

import { Toaster } from "react-hot-toast";

export function ToasterWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            background: "#16a34a",
            color: "#bbf7d0",
          },
        },
        error: {
          style: {
            background: "#dc2626",
            color: "#fecaca",
          },
        },
      }}
    />
  );
}
