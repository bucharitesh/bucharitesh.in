import { SplitTextEffect } from "@/components/core/split-text-effect";

const Page = () => {
  return (
    <div className="grid grid-cols-1 p-20 gap-4 max-w-4xl mx-auto">
      <div className="h-96">
        <SplitTextEffect
          text={
            <>
              Security that <br /> scales with you.
            </>
          }
          fill={0.45}
          primaryColor="black"
          accentColor="#006efe"
          backgroundColor="black"
          gradientFrom="#00418c"
          gradientTo="transparent"
        />
      </div>

      <div className="h-72">
        <SplitTextEffect
          text="Grow Together"
          fill={0.5}
          primaryColor="#1a472a"
          accentColor="#2ecc71"
          backgroundColor="black"
          gradientFrom="#2ecc71"
          gradientTo="transparent"
        />
      </div>

      <div className="h-72">
        <SplitTextEffect
          text={
            <>
              MAKE AN
              <br />
              IMPACT
            </>
          }
          primaryColor="#000"
          accentColor="#ed8936"
          backgroundColor="#0f0f0f"
          gradientFrom="#000000"
          gradientTo="transparent"
          className="font-black tracking-tight"
        />
      </div>
    </div>
  );
}

export default Page

