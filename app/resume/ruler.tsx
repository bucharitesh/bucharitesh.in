export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;
export const MM_TO_PX = 3.7795275591;

export const Ruler: React.FC<{
  orientation: "horizontal" | "vertical";
  scrollPosition: number;
}> = ({ orientation, scrollPosition }) => {
  const isHorizontal = orientation === "horizontal";

  const rulerStyles = {
    "--ruler1-bdw": "1px",
    "--ruler1-c": "#BBB",
    "--ruler1-h": "12px",
    "--ruler1-space": 5,
    "--ruler2-bdw": "1px",
    "--ruler2-c": "#BBB",
    "--ruler2-h": "20px",
    "--ruler2-space": 10,
    "--ruler-unit": `${MM_TO_PX}px`,
  } as React.CSSProperties;

  return (
    <div className="hidden relative lg:block z-20">
      {/* Ruler background */}
      <div
        className={`fixed bg-white ${
          isHorizontal
            ? "left-8 right-0 top-0 h-8 border-b"
            : "left-0 top-8 bottom-0 w-8 border-r"
        } border-gray-200`}
        style={{
          ...rulerStyles,
        }}
      >
        {/* All lines container */}
        <div className="relative w-full h-full">
          {/* Short lines - rendered every mm except at 10mm intervals */}
          {Array.from(
            { length: 120 * 10 },
            (_, i) =>
              i % 10 !== 0 && (
                <div
                  key={i}
                  className="absolute bg-gray-400"
                  style={{
                    ...(isHorizontal
                      ? {
                          height: "10px",
                          width: "1px",
                          bottom: 0,
                          left: `${i * MM_TO_PX - scrollPosition}px`,
                        }
                      : {
                          width: "10px",
                          height: "1px",
                          right: 0,
                          top: `${i * MM_TO_PX - scrollPosition}px`,
                        }),
                  }}
                />
              )
          )}

          {/* Long lines - rendered every 10mm */}
          {Array.from({ length: 120 }, (_, i) => (
            <div
              key={`long-${i}`}
              className="absolute bg-gray-400"
              style={{
                ...(isHorizontal
                  ? {
                      height: "15px",
                      width: "1px",
                      bottom: 0,
                      left: `${i * 10 * MM_TO_PX - scrollPosition}px`,
                    }
                  : {
                      width: "15px",
                      height: "1px",
                      right: 0,
                      top: `${i * 10 * MM_TO_PX - scrollPosition}px`,
                    }),
              }}
            />
          ))}
        </div>
      </div>

      {/* Ruler numbers */}
      <div
        className={`fixed ${
          isHorizontal
            ? "left-8 right-0 top-0 flex flex-row items-end"
            : "left-0 top-8 bottom-0 flex flex-col items-end"
        } overflow-hidden`}
        style={{
          transform: isHorizontal
            ? `translateX(${-scrollPosition}px)`
            : `translateY(${-scrollPosition}px)`,
          willChange: "transform",
        }}
      >
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={i}
            className={`text-[10px] text-gray-500 flex-shrink-0 w-full ${
              isHorizontal ? "text-start pb-1" : "pr-1 mt-[0.2px]"
            }`}
            style={{
              width: isHorizontal ? `${10 * MM_TO_PX}px` : "100%",
              height: isHorizontal ? "100%" : `${10 * MM_TO_PX}px`,
              lineHeight: "1",
              flex: isHorizontal
                ? `0 0 ${10 * MM_TO_PX}px`
                : `0 0 ${10 * MM_TO_PX}px`,
            }}
          >
            {i * 10}
          </div>
        ))}
      </div>
    </div>
  );
};
