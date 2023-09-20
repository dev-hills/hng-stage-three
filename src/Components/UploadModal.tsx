/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactModal from "react-modal";
import Dropzone from "react-dropzone";
import upload from "/upload.png";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "93%",
    maxWidth: "750px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};

type modalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImageFiles: (images: File | any) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadModal = ({
  openModal,
  setOpenModal,
  setImageFiles,
  tags,
  setTags,
}: modalProps) => {
  const [imageFiles, setImageFilesState] = useState<File[]>([]);
  const [tagValue, setTagValue] = useState<string>("");

  function closeModal() {
    setOpenModal(false);
  }

  const handleDrop = (acceptedFiles: File[]) => {
    const filteredImageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    setImageFilesState(filteredImageFiles);
  };

  const handleUpload = () => {
    setOpenModal(false);
    imageFiles.length > 0
      ? (setImageFiles(imageFiles),
        toast.success("Image Uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        }))
      : (setOpenModal(true),
        toast.error("Oops!! Looks like you haven't uploaded an Image", {
          position: toast.POSITION.TOP_RIGHT,
        }));
    setTagValue("");
    setImageFilesState([]);
  };

  const addTag = () => {
    if (tagValue.trim() !== "") {
      setTags([...tags, tagValue.trim()]);
      setTagValue("");
    } else {
      toast.error("Oops!! Looks like you haven't added any tags", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags([...tags.filter((_, idx) => idx !== index)]);
  };

  return (
    <div>
      <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-col gap-[20px] items-center">
          {imageFiles.length > 0 ? (
            <>
              <img
                src={URL.createObjectURL(imageFiles[0])}
                alt=""
                className="w-[200px]"
              />

              <button onClick={() => setImageFilesState([])}>
                Clear Image
              </button>
            </>
          ) : (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="cursor-pointer mx-auto border-[2px] bg-gray-300 border-gray-600 rounded-lg w-[400px] h-[200px] mt-[50px] md:mx-[200px] md:border-none">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="p-3 text-center font-medium text-black flex flex-col items-center justify-center gap-5 mt-6 sm:w-auto">
                      Click here to upload image or Drag and Drop
                      <span>
                        <img src={upload} alt="" width={70} />
                      </span>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          )}

          <div className="flex flex-col gap-[10px]">
            <input
              type="text"
              placeholder="Enter tags (comma separated)"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={handleInputKeyPress}
              className="border-2 border-gray-600 text-center bg-white outline-none text-black font-bold py-2 px-8 rounded mx-auto"
            />
            <button
              onClick={addTag}
              className="border-2 border-gray-600 bg-gray-300 text-black hover:bg-transparent font-bold py-2 px-4 rounded mx-auto"
            >
              Add Tag
            </button>
            <div className="flex flex-row gap-[5px] items-center justify-center">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 px-2 py-1 rounded-xl font-semibold border-2 border-gray-600 cursor-default flex flex-row gap-[3px]"
                >
                  {tag}
                  <button
                    className="text-red-500 ml-3"
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="border-2 border-gray-600 bg-gray-300 text-black hover:bg-transparent font-bold py-2 px-4 rounded mx-auto"
          >
            Upload
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default UploadModal;
