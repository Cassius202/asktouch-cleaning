'use client'

interface ActionParams {
  blogId: string;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
  handleOpen: (id: string) => void;
  position: { x: number; y: number };
}

const MODAL_HEIGHT = 112; // updated for 3 buttons

const ActionsModal = ({ blogId, handleDelete, handleUpdate, handleOpen, position }: ActionParams) => {
  const openUpward = position.y + MODAL_HEIGHT > window.innerHeight;

  return (
    <div
      className="fixed z-50 w-36 bg-white rounded-md shadow-lg border border-gray-200"
      style={{
        top: openUpward ? position.y - MODAL_HEIGHT : position.y,
        left: position.x - 144,
      }}
    >
      <button
        onClick={() => handleOpen(blogId)}
        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
      >
        Open Blog
      </button>
      <button
        onClick={() => handleUpdate(blogId)}
        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
      >
        Edit
      </button>
      <div className="border-t border-gray-100" />
      <button
        onClick={() => handleDelete(blogId)}
        className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default ActionsModal;