'use client';

import Cal from '@calcom/embed-react';
// import { useEffect } from "react";
// import { getCalApi } from "@calcom/embed-react";

export default function CalEmbed() {
  // useEffect(() => {
  //   (async () => {
  //     const cal = await getCalApi({ namespace: "30min" })
  //     cal("ui", {
  //       hideEventTypeDetails: false,
  //       theme: "light",
  //     })
  //   })();
  // }, []);

  return (
    <div className="cal-embed">
      <Cal namespace="30min" calLink="bucharitesh/30min" />
    </div>
  );
}
