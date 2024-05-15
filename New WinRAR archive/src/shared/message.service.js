import { toast } from "sonner";

export const CustomToastService = {
  success: (message) => {
    toast.success(message);
  },

  error: (message) => {
    toast.error(message);
  },

  warning: (message) => {
    toast.warning(message);
  },

  info: (message) => {
    toast.info(message);
  },
};
