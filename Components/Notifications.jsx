import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = {
  notifySuccess: (message) => {
    console.log(message);
    toast.success(message, {
      toastId: "success",
      autoClose: 5000,
    });
  },
  notifyError: (message) => {
    console.log(message);
    toast.error(message, {
      toastId: "error",
    });
  },
  notifyWarning: (message) => {
    console.log(message);
    toast.warning(message, {
      toastId: "warning",
    });
  },
  notifyLoading: () => {
    console.log("Conversion in progress ...");
    return toast.loading("Conversion in progress ...", {
      toastId: "loading",
      autoClose: 3000,
      closeOnClick: true,
      closeButton: true,
    });
  },
  notifyConversionSuccess: (toastID) => {
    return toast.update(toastID, {
      render: "Conversion Success !",
      type: "success",
      isLoading: false,
    });
  },
  notifyConversionError: (toastID) => {
    return toast.update(toastID, {
      render: "Conversion Failed . Try Again !",
      type: "error",
      isLoading: false,
    });
  },
};

export default Notifications;
