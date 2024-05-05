import { Button } from "@/components/ui/Button";
import React from "react";

type Props = {};

const SuggestedEvent = (props: Props) => {
  const listEvent = [
    {
      key: 1
    },
    {
      key: 2
    }
  ];

  const handleFollow = () => {};

  return (
    <div className="">
      {listEvent.map(event => (
        <div key={event.key} className="mb-6 last:mb-0">
          <img
            className="rounded-lg aspect-[16/7] cursor-pointer w-full h-full"
            srcSet={`https://picsum.photos/80/80?random=${event.key}`}
            alt="avatar"
            onClick={handleFollow}
          />
        </div>
      ))}
    </div>
  );
};

export default SuggestedEvent;
