import { allCrafts } from "content-collections";

export const getCrafts = async () => {
  let crafts = await allCrafts;

  crafts = crafts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  crafts = crafts.filter((craft) => craft.published);

  return crafts;
};
