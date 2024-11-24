import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
      {children}
    </div>
  );
};

export default Layout