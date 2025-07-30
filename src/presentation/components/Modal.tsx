// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500/50 transition-opacity z-0" />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                className="relative z-10 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
                overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">

                <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0  sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Publicar nueva laptop
                        </h3>
                        {/* Input de imagen */}
                        <div className="mt-2">
                            <div className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" />
                                <div className="text-center">
                                    <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt=""/>

                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        <label for="file-upload" class="relative cursor-pointer">
                                            <span>Drag and drop</span>
                                            <span className="text-indigo-600"> or browse</span>
                                            <span>to upload</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>

                                <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" />
                            </div>
                        </div>
                        {/* Input de imagen */}
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                        Aceptar
                    </button>
                    </span>
                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                        Cancelar
                    </button>
                    </span>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
