type ImageCardProps = {
  image: string;

  tag?: string[];
};
const ImageCard = ({ image, tag }: ImageCardProps) => {
  console.log(tag);

  return (
    <div className="rounded-[10px]">
      <div className="absolute flex flex-row gap-[5px]">
        {tag &&
          tag.map((tag) => {
            return <h1 className="bg-gray-300 px-2 rounded-md m-2">{tag}</h1>;
          })}
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default ImageCard;
