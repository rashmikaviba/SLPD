import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default function ConfirmationModal({
  show,
  onClose,
  onConfirm,
  message,
}) {
  return (
    <>
      {show && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
          onClick={onClose} // Close modal when clicking outside it
        ></div>
      )}
      <Modal
        show={show}
        onClose={onClose}
        popup
        size={"sm"}
        className="min-w-[300px] max-w-[400px] mx-auto"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center p-3">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-gradient-to-r from-green-500 to-gray-500 text-white"
                onClick={onConfirm}
              >
                Confirm
              </Button>
              <Button
                className="bg-gradient-to-r from-green-500 to-gray-500 text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
