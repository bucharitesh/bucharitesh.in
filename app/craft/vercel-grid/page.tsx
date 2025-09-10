'use client';

import type React from 'react';
import Grid from './grid';

const Page = () => {
  return (
    <div className="mx-auto flex w-full max-w-(--breakpoint-lg) flex-col items-center justify-center space-y-10 p-6 pb-20">
      <Wrapper title="Grid" description="A non-responsive grid with no cells.">
        <Grid.System>
          <Grid height={'preserve-aspect-ratio'} columns={5} rows={2} />
        </Grid.System>
      </Wrapper>

      <Wrapper
        title="Basic grid"
        description="A non-responsive single grid with auto flowing cells configuration."
      >
        <Grid.System guideWidth={1}>
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
      </Wrapper>

      <Wrapper
        title="Responsive grid"
        description="Grid component with responsive rows and columns props at all 3 breakpoints."
      >
        <Grid.System guideWidth={1}>
          <Grid columns={3} rows={2}>
            <Grid.Cell>1</Grid.Cell>
            <Grid.Cell>2</Grid.Cell>
            <Grid.Cell>3</Grid.Cell>
            <Grid.Cell>4</Grid.Cell>
            <Grid.Cell>5</Grid.Cell>
            <Grid.Cell>6</Grid.Cell>
          </Grid>
        </Grid.System>
      </Wrapper>

      {/* <Wrapper
        title="Responsive Grid with responsive guide clipping cells"
        description="Grid component with responsive rows and columns props at all 3 breakpoints as well as guide clipping on specific cells."
      >
        <Grid.System>
          <Grid
            columns={{ sm: 1, md: 2, lg: 3 }}
            rows={{ sm: 6, md: 3, lg: 2 }}
          >
            <Grid.Cell
              column={{ sm: "1", md: "1/3" }}
              row={{ sm: "1/3", md: 1 }}
              solid
            >
              1 + 2
            </Grid.Cell>
            <Grid.Cell>3</Grid.Cell>
            <Grid.Cell>4</Grid.Cell>
            <Grid.Cell
              column={{ sm: 1, md: "1/3", lg: "2/4" }}
              row={{ sm: "5/7", md: 3, lg: 2 }}
              solid
            >
              5 + 6
            </Grid.Cell>
          </Grid>
        </Grid.System>
      </Wrapper> */}

      <Wrapper title="Grid with hidden row guides">
        <Grid.System>
          <Grid
            columns={12}
            height="preserve-aspect-ratio"
            hideGuides="row"
            rows={3}
          />
        </Grid.System>
      </Wrapper>

      <Wrapper title="Grid with hidden column guides">
        <Grid.System>
          <Grid
            columns={12}
            height="preserve-aspect-ratio"
            hideGuides="column"
            rows={3}
          />
        </Grid.System>
      </Wrapper>

      <Wrapper
        title="Grid with overlaying cells"
        description="Grid component with cells that overlay another in various states."
      >
        <Grid.System>
          <Grid columns={12} rows={3}>
            <Grid.Cell column="1/3" row="1/3" solid>
              1
            </Grid.Cell>
            <Grid.Cell column="2/4" row="2/4">
              2
            </Grid.Cell>
            <Grid.Cell column="3/10" row="2/4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
              felis
            </Grid.Cell>
            <Grid.Cell column="7/12" row="1/-1" solid>
              3
            </Grid.Cell>
            <Grid.Cell column="11/13" row="1/3" solid>
              4
            </Grid.Cell>
          </Grid>
        </Grid.System>
      </Wrapper>

      <Wrapper
        title="Specific Grid with Guide Clipping"
        description="Grid component with guide clipping enabled on specific cells."
      >
        <Grid.System guideWidth={1}>
          <Grid columns={3} rows={4}>
            <Grid.Cell column="1/2" row="1/3" solid>
              1
            </Grid.Cell>
            <Grid.Cell column="3/4" row="1/2" solid>
              2
            </Grid.Cell>
            <Grid.Cell column="2/3" row="2/4">
              3
            </Grid.Cell>
            <Grid.Cell column="1/2" row="4/5" solid>
              4
            </Grid.Cell>
            <Grid.Cell column="3/4" row="3/5" solid>
              5
            </Grid.Cell>
          </Grid>
        </Grid.System>
      </Wrapper>
    </div>
  );
};

const Wrapper = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start justify-center gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-start font-bold text-2xl">{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Page;
