import { MouseSparkles } from '@/registry/bucharitesh/magical-mouse';

const MagicalMouseDemo = () => {
  return (
    <div
      className="h-[400px] w-full overflow-hidden rounded-xl bg-white"
      style={{
        background:
          'linear-gradient(145deg, rgb(119, 46, 195), rgb(58, 18, 153))',
      }}
    >
      <MouseSparkles />
    </div>
  );
};

export default MagicalMouseDemo;
