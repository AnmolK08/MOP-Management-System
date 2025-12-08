import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // install: npm i lucide-react

export default function BackButton({location}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/${location}`)}
      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-[#e7764e] font-medium transition"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}
