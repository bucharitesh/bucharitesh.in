import React from 'react';
import { toast } from 'sonner';

const Page = () => {
  return (
    <div>
      <h1
        onClick={() => {
          toast('test');
        }}
      >
        Test
      </h1>
    </div>
  );
};

export default Page;
