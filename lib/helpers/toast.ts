import { toast } from "react-hot-toast";
export const toastMessage = (
  type: "success" | "error",
  message: string,
  id: string
) => {
  if (type === "success") {
    toast.success(message, {
      id,
      className: "border-none w-max-content h-auto py-4 px-4 text-xl",
      ariaProps: {
        role: "alert",
        "aria-live": "polite",
      },
    });
  }
  if (type === "error") {
    toast.error(message || "Some error happened", {
      id,
      className: "border-none w-max-content h-auto py-4 px-4 text-xl",
      ariaProps: {
        role: "alert",
        "aria-live": "polite",
      },
    });
  }
};
