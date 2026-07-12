import Swal from "sweetalert2";

const baseOptions = {
  confirmButtonText: "تمام",
  confirmButtonColor: "#d4af37",
  background: "#15111f",
  color: "#fff",
};

export const showPopup = (
  icon: "success" | "error" | "warning" | "info" | "question",
  title: string,
  text: string
) => {
  return Swal.fire({
    icon,
    title,
    text,
    ...baseOptions,
  });
};