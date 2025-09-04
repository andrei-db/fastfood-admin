export default function ConfirmModal({ open, title, message, onCancel }) {
  return (
    <div
      className={` text-gray-700 fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl p-6 z-10 transform transition-all duration-300 w-full max-w-md ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
