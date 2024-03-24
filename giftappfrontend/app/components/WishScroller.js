import Image from "next/image";
import note from "../assets/note.svg";
import { useRouter } from "next/navigation";

const WishScroller = ({ data }) => {
  const router = useRouter();
  const giftsArray = data;

  console.log(giftsArray);
  return (
    <div className="w-[50vw] border-[0.6rem] border-[#e42d55] border-double rounded-lg p-4">
      {giftsArray.map((gift) => {
        const handleClick = (e) => {
          e.preventDefault();
          router.push(`\\wishlist\\${gift._id}`);
        };
        return (
          <button className="w-full" onClick={handleClick}>
            <div className="w-full p-3 bg-purple-100 rounded-lg mb-3">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <div className="pl-3">
                    <Image width={30} height={30} src={note} alt="Note Image" />
                  </div>
                  <div className="text-[#50006c] pt-1 pl-2">
                    {gift.giftname.toUpperCase()}
                  </div>
                </div>
                <p>
                  ${gift.minPrice} - ${gift.maxPrice}
                </p>
              </div>

              <div className="flex flex-row">
                {gift.tags.map((tag) => (
                  <p className="px-3 text-[#e42d55] pt-3">{tag}</p>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default WishScroller;
