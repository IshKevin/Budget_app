"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-2 px-4 rounded-md transition-all duration-200 ${
        pending 
          ? 'bg-green-400 cursor-not-allowed' 
          : 'bg-green-500 hover:bg-green-600'
      } text-white focus:ring-2 focus:ring-green-300`}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Adding Account...</span>
        </div>
      ) : (
        'Add Account'
      )}
    </button>
  );
}