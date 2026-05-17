import { PropagateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="purple" size={15} />
    </div>
  );
}