import { PropagateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#8b5cf6" size={15} />
    </div>
  );
}