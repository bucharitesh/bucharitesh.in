import RetroImage from "./retro";

const MyPage = () => {
  return (
    <div className="grid grid-cols-2 gap-10 place-items-center">
      <RetroImage
        src="https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/bucha_h6yyke.png"
        width={100}
        height={100}
      />

      <RetroImage
        src="https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2019/12/Shahrukh-Khan.jpg"
        width={100}
        height={100}
      />

      <RetroImage
        src="https://rauchg.com/images/rauchg-3d4cecf.jpg"
        width={100}
        height={100}
      />

      <RetroImage
        src="https://avatars.githubusercontent.com/u/124599?v=4"
        width={100}
        height={100}
      />
    </div>
  );
};

export default MyPage;
