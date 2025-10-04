'use client';
import { Grid } from './grid';
import './grid.css';

const Page = () => {
  return (
    <div className="w-full space-y-10 bg-[#f4f4f4]">
      <div className="px-0 md:px-0">
        <Grid>
          <div className="h-[200px] w-full bg-red-500" />
          <div className="h-[400px] w-full bg-blue-500" />
          <div className="h-[100px] w-full bg-green-500" />
          <div className="h-[400px] w-full bg-yellow-500" />
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
          <div className="h-[400px] w-full bg-purple-500" />
          <div className="h-[400px] w-full bg-pink-500" />
        </Grid>
      </div>
    </div>
  );
};

export default Page;
