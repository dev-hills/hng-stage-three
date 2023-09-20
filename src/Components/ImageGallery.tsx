/* eslint-disable @typescript-eslint/no-explicit-any */
import { useImages } from "../hooks/useImages";
import ImageCard from "./ImageCard";
import UploadModal from "./UploadModal";
import logo from "/logo.png";
import upload from "/upload.png";
import { useState, useEffect } from "react";

const ImageGallery = () => {
  type ImageProps = {
    id: number | string;
    image: File | null;
    tags?: string[];
  };
  const { data, isLoading } = useImages();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<ImageProps[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filteredUploadedImages, setFilteredUploadedImages] =
    useState<ImageProps[]>(uploadedImages);

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
            className="p-0 m-o outline-none border-none w-[430px] px-3"
            placeholder="Search by Image Tags"
          />
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
                  <ImageCard
                    key={idx}
                    image={
                      Array.isArray(item?.image) && item.image.length > 0
                        ? URL.createObjectURL(item.image[0])
                        : ""
                    }
                    tag={item?.tags}
                  />
                );
              })}
            {data?.map((item: any, idx: any) => {
              return <ImageCard key={idx} image={item.urls.small} />;
            })}
          </>
        )}
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
