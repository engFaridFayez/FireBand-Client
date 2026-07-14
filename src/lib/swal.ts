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
  message: string | string[]
) => {
  const html = Array.isArray(message)
    ? `<ul style="text-align:left; margin:0; padding-left:1.2em;">${message
      .map((m) => `<li>${m}</li>`)
      .join("")}</ul>`
    : message;

  return Swal.fire({
    icon,
    title,
    html,
    ...baseOptions,
  });
};