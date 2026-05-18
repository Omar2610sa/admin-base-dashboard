import Swal from "sweetalert2";

export const UnSuccessAlert = ({title}: {title: string}) => {
    return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        didOpen: (toast: HTMLElement) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
        icon: "error",
        title: title || "Invalid credentials",
    });
};