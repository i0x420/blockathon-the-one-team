import { Button } from "@/components/ui/Button";
import React from "react";

type Props = {};

const SuggestedUser = (props: Props) => {
  const listUser = [
    {
      key: 1,
      name: "Long"
    },
    {
      key: 2,
      name: "Dung"
    },
    {
      key: 3,
      name: "Dai"
    },
    {
      key: 4,
      name: "Nhan"
    }
  ];

  const handleFollow = () => {};

  return (
    <div className="">
      {listUser.map(user => (
        <div
          key={user.key}
          className="flex items-center justify-between mb-6 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <img
              className="rounded w-8 h-8"
              srcSet={`https://picsum.photos/80/80?random=${user.key}`}
              alt="avatar"
            />
            <span>{user.name}</span>
          </div>

          <p
            className="text-brand-primary cursor-pointer"
            onClick={handleFollow}
          >
            Follow
          </p>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUser;
