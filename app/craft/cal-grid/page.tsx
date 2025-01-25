"use client";

import React from "react";
import { Grid, GridSmall, GridSmallCell } from "./grid";
import "./grid.css";

const Page = () => {
  return (
    <div className="w-full bg-[#f4f4f4] space-y-10">
      <div className="px-0 md:px-0">
        <Grid>
          <div className="w-full h-[200px] bg-red-500" />
          <div className="w-full h-[400px] bg-blue-500" />
          <div className="w-full h-[100px] bg-green-500" />
          <div className="w-full h-[400px] bg-yellow-500" />
          {/* <div className="py-40">
            <GridSmall rows={2} columns={4}>
              <GridSmallCell>
                <div className="w-full h-full flex items-center justify-center bg-yellow-500">
                  Hello
                </div>
              </GridSmallCell>
              <GridSmallCell>
                <div className="w-full h-full flex items-center justify-center bg-yellow-500">
                  Hello
                </div>
              </GridSmallCell>
              <GridSmallCell>
                <div className="w-full h-full flex items-center justify-center bg-yellow-500">
                  Hello
                </div>
              </GridSmallCell>
              <GridSmallCell>
                <div className="w-full h-full flex items-center justify-center bg-yellow-500">
                  Hello
                </div>
              </GridSmallCell>
              <GridSmallCell>
                <div className="w-full h-full flex items-center justify-center bg-yellow-500">
                  Hello
                </div>
              </GridSmallCell>
            </GridSmall>
          </div> */}
          <div className="w-full h-[400px] bg-purple-500" />
          <div className="w-full h-[400px] bg-pink-500" />
        </Grid>
      </div>
    </div>
  );
};

export default Page;
