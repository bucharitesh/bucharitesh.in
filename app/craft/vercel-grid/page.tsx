"use client";

import React from "react";
import Grid from "./grid";

const Page = () => {
  return (
    <div className="w-full p-6 mx-auto space-y-10 flex items-center justify-center flex-col pb-20">
      <Grid.System >
        <Grid height={"preserve-aspect-ratio"} columns={5} rows={2} />
      </Grid.System>

      <Grid.System  guideWidth={1}>
        <Grid columns={3} rows={2}>
          <Grid.Cross column={1} row={1} />
          <Grid.Cell>1</Grid.Cell>
          <Grid.Cell>2</Grid.Cell>
          <Grid.Cell>3</Grid.Cell>
          <Grid.Cell>4</Grid.Cell>
          <Grid.Cell>5</Grid.Cell>
          <Grid.Cell>6</Grid.Cell>
        </Grid>
      </Grid.System>

      {/* <Grid.System >
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} rows={{ sm: 6, md: 3, lg: 2 }} hideGuides="column">
          <Grid.Cell column={{ sm: "1", md: "1/3" }} row={{ sm: "1/3", md: 1 }}>
            1 + 2
          </Grid.Cell>
          <Grid.Cell>3</Grid.Cell>
          <Grid.Cell>4</Grid.Cell>
          <Grid.Cell
            column={{ sm: 1, md: "1/3", lg: "2/4" }}
            row={{ sm: "5/7", md: 3, lg: 2 }}
          >
            5 + 6
          </Grid.Cell>
        </Grid>
      </Grid.System> */}

      <Grid.System >
        <Grid columns={12} rows={3}>
          <Grid.Cell column="1/3" row="1/3">
            1
          </Grid.Cell>
          <Grid.Cell column="2/4" row="2/4">
            2
          </Grid.Cell>
          <Grid.Cell column="3/10" row="2/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
            felis
          </Grid.Cell>
          <Grid.Cell column="7/12" row="1/-1">
            3
          </Grid.Cell>
          <Grid.Cell column="11/13" row="1/3">
            4
          </Grid.Cell>
        </Grid>
      </Grid.System>

      <Grid.System guideWidth={1}>
        <Grid columns={3} rows={4}>
          <Grid.Cell column="1/2" row="1/3">
            1
          </Grid.Cell>
          <Grid.Cell column="3/4" row="1/2">
            2
          </Grid.Cell>
          <Grid.Cell column="2/3" row="2/4">
            3
          </Grid.Cell>
          <Grid.Cell column="1/2" row="4/5">
            4
          </Grid.Cell>
          <Grid.Cell column="3/4" row="3/5">
            5
          </Grid.Cell>
        </Grid>
      </Grid.System>

      <Grid.System >
        <Grid
          columns={14}
          height="preserve-aspect-ratio"
          hideGuides="row"
          rows={3}
        >
          <Grid.Cross column={1} row={1} />
          <Grid.Cell>
            1
          </Grid.Cell>
          <Grid.Cell>
            2
          </Grid.Cell>
          <Grid.Cell>
            3
          </Grid.Cell>
        </Grid>
      </Grid.System>

      <Grid.System >
        <Grid
          columns={12}
          height="preserve-aspect-ratio"
          hideGuides="column"
          rows={3}
        />
      </Grid.System>
    </div>
  );
};

export default Page;
