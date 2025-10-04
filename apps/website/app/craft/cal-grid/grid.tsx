import React from 'react';

const Grid = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="calendar-grid">
      {React.Children.map(children, (child) => (
        <section className="mx-3 md:mx-0">
          <div className="relative mx-auto w-full max-w-[1200px] gap-8 overflow-clip rounded-xl">
            {child}
          </div>
        </section>
      ))}
    </div>
  );
};

const GridSmall = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mx-auto grid grid-cols-2 place-items-center content-center sm:grid-cols-4 md:w-max lg:grid-cols-4">
      {children}
    </div>
  );
};

const GridSmallCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid p-3 shadow-[1px_1px_0px_0px_#E1E2E3,inset_1px_1px_0px_0px_#E1E2E3] before:pointer-events-none before:absolute before:top-0 before:right-[-100vw] before:left-[-100vw] before:h-full before:shadow-[0px_1px_0px_0px_#E1E2E3,inset_1px_1px_0px_0px_#E1E2E3] after:pointer-events-none after:absolute after:top-full after:left-0 after:hidden after:h-8 after:w-full after:shadow-[1px_0px_0px_0px_#E1E2E3,inset_1px_0px_0px_0px_#E1E2E3]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[-11px] right-[-11px] bottom-[-11px] left-[-11px] z-10 bg-[url(/cross.svg),url(/cross.svg),url(/cross.svg),url(/cross.svg)] bg-position-[top_left,top_right,bottom_left,bottom_right] bg-size-[22px] bg-no-repeat"
      />
      <div className="perspective-1000 h-40 w-full max-w-[180px]">
        <div className="group relative grid h-full w-full overflow-clip rounded-2xl bg-white shadow-fade [&amp;>*]:[grid-area:1/1]">
          {children}
        </div>
      </div>
    </div>
  );
};

export { Grid, GridSmall, GridSmallCell };
