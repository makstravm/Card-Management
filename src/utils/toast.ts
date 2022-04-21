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
export const notifySuccess = (msg: string) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
