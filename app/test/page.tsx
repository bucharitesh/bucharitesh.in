
import { SplitTextEffect } from "@/registry/default/bucharitesh/split-text-effect";

const page = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-96 w-full max-w-2xl">
        <SplitTextEffect text="Grow Together" fill={0.5} accent="#2ecc71" />
      </div>
    </div>
  );
};

export default page