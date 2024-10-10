"use client";

import React from "react";
import Grid from "../bucharitesh/vercel-grid";

const VercelGridDemo = () => {
  return (
    <div className="relative space-y-10 w-full">
      <Grid rows={4} columns={4}>
        <Grid.Cell row="auto" column={1}>
          What
        </Grid.Cell>
        <Grid.Cell row="auto" column={4}>
          will
        </Grid.Cell>
        <Grid.Cell row={2} column={3}>
          you
        </Grid.Cell>
        <Grid.Cell row={3} column={4}>
          ship
        </Grid.Cell>
        <Grid.Cell row={4} column="auto">
          ?
        </Grid.Cell>
      </Grid>

      <Grid rows={4} columns={4}>
        <Grid.Cross column={1} row={4} />
        <Grid.Cross column={2} row={3} />
        <Grid.Cross column={2} row={4} />
        <Grid.Cross column={3} row={2} />
        <Grid.Cross column={3} row={3} />
        <Grid.Cross column={3} row={4} />
        <Grid.Cross column={4} row={3} />
        <Grid.Cross column={4} row={4} />
        <Grid.Cross column={5} row={4} />
      </Grid>
    </div>
  );
};

export default VercelGridDemo;
