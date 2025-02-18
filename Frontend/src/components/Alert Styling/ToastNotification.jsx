// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ToastNotification = (type, message) => {
//   switch (type) {
//     case "success":
//       toast.success(message);
//       break;
//     case "error":
//       toast.error(message);
//       break;
//     case "info":
//       toast.info(message);
//       break;
//     case "warning":
//       toast.warning(message);
//       break;
//     default:
//       toast(message); // Default toast
//       break;
//   }
// };

// export default ToastNotification;


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = (type, message) => {
  if (!message) return;

  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-center",
        autoClose: false, // Prevent auto-closing
        closeOnClick: false, // Require manual close
        draggable: false
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      });
      break;
    case "info":
      toast.info(message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      });
      break;
    case "warning":
      toast.warning(message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      });
      break;
    default:
      toast(message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      });
      break;
  }
};

export default ToastNotification;
