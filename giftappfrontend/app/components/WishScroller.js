const WishScroller = ({ data }) => {
  const giftsArray = data;

  return (
    <div>
      {giftsArray.map((gift) => {
        <div className="w-[3/5] h-[2/5] bg-purple-200">
          {gift.giftname} text
        </div>;
      })}
    </div>
  );
};

export default WishScroller;
