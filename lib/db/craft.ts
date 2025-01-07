import { allCrafts } from "content-collections";

export const getCrafts = async () => {
  const crafts = await allCrafts;

  const sortedCrafts = crafts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sortedCrafts;
};
