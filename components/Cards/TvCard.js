import { StarIcon } from "@heroicons/react/solid";
import react from "react";
import { Constant } from "../../Constant";
import Image from "next/image";
import Link from "next/link";

const TvCard = react.forwardRef(({ media }, ref) => {
  return (
    <Link href={`/Tv/${media.id}`}>
      <a>
        <div
          ref={ref}
          className="m-8 flex flex-row justify-around items-center p-5 bg-gray-600 rounded-[24px]"
        >
          <div className="h-32 w-24 rounded-[12px] lg:h-56 lg:w-48">
            <div className="relative h-24 w-16 rounded-[12px] lg:h-56 lg:w-36">
              <Image
                src={`${Constant.IMG_500}${media.poster_path}`}
                alt={media.name}
                layout="fill"
              />
            </div>
          </div>
          <div className="flex flex-col p-8 w-full">
            <p className="m-0 text-base lg:text-4xl text-white cursor-pointer">
              {media.name}
            </p>
            <p className="m-0 mt-2 text-xs lg:text-sm text-gray-400 ">
              {media.first_air_date}
            </p>
            <div className="m-0 mt-2 flex flex-row items-center">
              {/* Media Rating */}
              <StarIcon className="text-yellow-500 w-5 h-5" />
              <p className="m-0 text-gray-400 ml-2 text-sm">
                {media.vote_average}/10
              </p>
            </div>
            <p className="m-0 text-gray-200 mt-2 max-w-full overflow-hidden text-base overflow-ellipsis">
              {media.overview || "No description available"}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
});

export default TvCard;
