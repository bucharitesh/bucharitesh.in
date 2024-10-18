import React from 'react'
import { Avatar, AvatarImage } from "./avatar";
import DitheredImage from './dithering';

const Page = () => {
  return (
    <div className="grid grid-cols-2 gap-10 place-items-center">
      <Avatar size={300}>
        <AvatarImage
          src="https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/bucha_h6yyke.png"
          alt="@shadcn"
        />
      </Avatar>

      <Avatar size={300}>
        <AvatarImage
          src="https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2019/12/Shahrukh-Khan.jpg"
          alt="@shadcn"
        />
      </Avatar>

      <Avatar size={300}>
        <AvatarImage
          src="https://rauchg.com/images/rauchg-3d4cecf.jpg"
          alt="@shadcn"
        />
      </Avatar>

      <Avatar size={300}>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/124599?v=4"
          alt="@shadcn"
        />
      </Avatar>

      <DitheredImage
        src="https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/bucha_h6yyke.png"
        width={300}
        height={300}
      />

      <DitheredImage
        src="https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2019/12/Shahrukh-Khan.jpg"
        width={300}
        height={300}
      />

      <DitheredImage
        src="https://rauchg.com/images/rauchg-3d4cecf.jpg"
        width={300}
        height={300}
      />

      <DitheredImage
        src="https://avatars.githubusercontent.com/u/124599?v=4"
        width={300}
        height={300}
      />
    </div>
  );
}

export default Page