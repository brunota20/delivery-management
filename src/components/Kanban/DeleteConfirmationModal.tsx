import React from "react";
import Button from "../Button";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600">
            Are you sure you want to delete this delivery? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end px-6 py-4 space-x-3 border-t">
          <Button
          label="Cancel"
          onClick={onClose}
          variant="secondary"
          size="medium"
          />
          <Button
          label="Delete"
          onClick={onConfirm}
          variant="danger"
          size="medium"
          disabled={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
