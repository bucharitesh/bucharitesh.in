import {
  allDesignInspirationItems,
  DesignInspirationItem,
} from "@/old/.contentlayer/generated";

export const getDesignInspiration = async () => {
  let data: DesignInspirationItem[] = [];

  let all = [...allDesignInspirationItems];

  if (all.length > 0) {
    data = all;
  }

  return { data: data };
};
