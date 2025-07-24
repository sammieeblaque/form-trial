/* eslint-disable @typescript-eslint/no-explicit-any */
export const FilePreview = ({
  files,
  onRemove,
  multiple,
}: {
  files: FileList | File[] | null;
  onRemove: (index: number | null) => void;
  multiple?: boolean;
}) => {
  if (!files || (Array.isArray(files) && files.length === 0)) return null;

  const fileList = Array.isArray(files) ? files : [files];

  return (
    <div className="mt-2 space-y-2">
      {fileList.map((file: any, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 bg-gray-50 rounded border"
        >
          <div className="flex items-center space-x-2">
            {file?.type?.startsWith("image/") && file instanceof File ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">FILE</span>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(multiple ? index : null)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
