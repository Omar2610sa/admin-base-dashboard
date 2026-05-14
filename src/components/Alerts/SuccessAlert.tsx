import Swal from "sweetalert2";


const toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // background: "#0f172a",
    // color: "#fff",
    theme: "material-ui-dark"


});

export const SuccessAlert = (
    text: string = "Success"
) => {
    return toast.fire({
        icon: "success",
        title: text,
    });
};