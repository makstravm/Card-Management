import { toast } from "react-toastify";

toast.configure();

export const notify = (msg: string) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
