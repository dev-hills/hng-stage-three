/* eslint-disable @typescript-eslint/no-explicit-any */
import { useImages } from "../hooks/useImages";
import ImageCard from "./ImageCard";
import UploadModal from "./UploadModal";
import logo from "/logo.png";
import upload from "/upload.png";
import { useState, useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import fireBase from "../FirebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logout from "/logout.png";

const ImageGallery = () => {
  type ImageProps = {
    id: number | string;
    image: File | null;
    tags?: string[];
  };
  const { data, isLoading } = useImages();
  const auth = getAuth(fireBase);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<ImageProps[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filteredUploadedImages, setFilteredUploadedImages] =
    useState<ImageProps[]>(uploadedImages);
  const [draggedImage, setDraggedImage] = useState<ImageProps | null>(null);
  const [apiData, setApiData] = useState<any>([]);

  useEffect(() => {
    setApiData(data);
  }, [data]);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        window.location.href = "/";
      })
      .catch(() => {
        toast.error("Error Logging out, try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleDragStart = (image: ImageProps | any) => {
    setDraggedImage(image);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDropUploadedImages = (image: ImageProps) => {
    if (draggedImage && draggedImage !== image) {
      const updatedImages = [...uploadedImages]; // Make a copy of the array
      const draggedIndex = updatedImages.findIndex(
        (item) => item.id === draggedImage.id
      );
      const droppedIndex = updatedImages.findIndex(
        (item) => item.id === image.id
      );

      // Swap the positions of the dragged image and the dropped image
      [updatedImages[draggedIndex], updatedImages[droppedIndex]] = [
        updatedImages[droppedIndex],
        updatedImages[draggedIndex],
      ];

      setUploadedImages(updatedImages); // Update the state with the modified array
      setDraggedImage(null); // Reset the draggedImage state
    }
  };

  const handleDropApiImages = (apiImage: any) => {
    if (draggedImage && draggedImage !== apiImage) {
      const updatedImages = apiData.map((item: any) => {
        if (item.id === draggedImage.id) {
          return apiImage;
        } else if (item.id === apiImage.id) {
          return draggedImage;
        }
        return item;
      });

      setApiData(updatedImages); // Update the state with the modified array
      setDraggedImage(null); // Reset the draggedImage state
    }
  };

  useEffect(() => {
    setFilteredUploadedImages(uploadedImages);
  }, [uploadedImages]);

  const handleSearch = (searchString: string) => {
    const filtered = uploadedImages.filter((item) => {
      return item.tags?.some((tag) => tag.includes(searchString));
    });
    setFilteredUploadedImages(filtered);
  };

  const handleImageUpload = (images: File) => {
    setUploadedImages([
      { id: uploadedImages.length + 1, image: images, tags: tags },
      ...uploadedImages,
    ]);
    setTags([]);
  };

  return (
    <div>
      <nav className="flex flex-row items-center justify-between px-14 md:px-2">
        <div>
          <img src={logo} alt="" className="w-[170px] mx-auto sm:w-[100px]" />
        </div>
        <div className=" border-[1px] border-gray-300 flex flex-row items-center justify-center gap-3 w-[430px] py-3 rounded-lg sm:w-[200px]">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            className="p-0 m-o outline-none border-none w-[430px] px-3 sm:w-[200px] bg-transparent"
            placeholder="Search by Image Tags"
          />
        </div>

        <div
          onClick={handleLogout}
          className="cursor-pointer flex flex-row items-center gap-3"
        >
          Logout
          <span>
            <img src={logout} alt="" className="w-[20px]" />
          </span>
        </div>
      </nav>

      <div
        className=" flex flex-row items-center justify-center gap-3 border-[1px] border-gray-300 mx-auto w-[200px] py-4 rounded-lg cursor-pointer hover:bg-gray-300"
        onClick={() => setOpenModal(true)}
      >
        <span>
          <img src={upload} alt="" width={35} />
        </span>
        Upload Image
      </div>
      <div className="grid grid-cols-3 p-16 gap-y-5 gap-x-6 place-items-center md:grid-cols-2 sm:gap-7 sm:p-4">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="w-[300px] h-48 bg-gray-300 animate-pulse rounded-lg"
            ></div>
          ))
        ) : (
          <>
            {uploadedImages.length > 0 &&
              filteredUploadedImages.map((item: ImageProps, idx: number) => {
                return (
                  <div
                    key={idx}
                    draggable // Enable dragging
                    onDragStart={() => handleDragStart(item)} // Set the dragged image on drag start
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropUploadedImages(item)} // Handle drop event
                    className={`transform transition-transform duration-200 ease-in-out ${
                      draggedImage === item ? "scale-95 opacity-70" : ""
                    }`}
                  >
                    <ImageCard
                      key={idx}
                      image={
                        Array.isArray(item?.image) && item.image.length > 0
                          ? URL.createObjectURL(item.image[0])
                          : ""
                      }
                      tag={item?.tags}
                    />
                  </div>
                );
              })}
            {data.length > 0 &&
              apiData?.map((item: any, idx: any) => {
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropApiImages(item)}
                    className={`transform transition-transform duration-200 ease-in-out ${
                      draggedImage === item ? "scale-95 opacity-70" : ""
                    }`}
                  >
                    {" "}
                    <ImageCard key={idx} image={item?.urls?.small} />
                  </div>
                );
              })}
          </>
        )}
      </div>

      <div className="mx-auto flex items-center justify-center pb-5">
        <p className="text-gray-500 font-medium">
          {`Cooked with Love ❤️ by Hills.Dev </>`}
        </p>
      </div>

      <UploadModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setImageFiles={handleImageUpload}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
};

export default ImageGallery;
