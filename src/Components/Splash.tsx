/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageCard from "./ImageCard";
import logo from "/logo.png";
import { useImages } from "../hooks/useImages";
import { Link } from "react-router-dom";

const Splash = () => {
  const { data } = useImages();

  const spliced = data?.splice(0, 6);
  return (
    <div>
      <nav className="flex flex-row items-center justify-center px-14 md:px-2">
        <div>
          <img src={logo} alt="" className="w-[170px] mx-auto sm:w-[100px]" />
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center">
        <p className="font-medium text-lg flex justify-center py-2 text-center md:py-5">
          Login to upload Images and rearrange them just how you want it
        </p>

        <Link to="/login">
          <button className="py-2  border-2 border-gray-300 w-[100px] font-semibold hover:bg-gray-300 md:my-7">
            Login
          </button>
        </Link>
      </div>

      <div className="w-[600px] grid grid-cols-3 p-16 gap-y-[2px] gap-x-[4px] place-items-center mx-auto md:grid-cols-2 md:w-[300px] sm:p-5 sm:py-5">
        {spliced?.map((item: any, idx: any) => {
          return (
            <div key={idx}>
              {" "}
              <ImageCard key={idx} image={item?.urls?.small} />
            </div>
          );
        })}
      </div>

      <div className="mx-auto flex items-center justify-center pb-5">
        <p className="text-gray-500 font-medium">
          {`Cooked with Love ❤️ by Hills.Dev </>`}
        </p>
      </div>
    </div>
  );
};

export default Splash;
