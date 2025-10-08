export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center bg-black/25  z-50 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-2xl  w-full max-w-md p-6 relative animate-scaleIn"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
