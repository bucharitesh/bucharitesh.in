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
    "--ruler1-c": "var(--ruler-color)",
    "--ruler1-h": "12px",
    "--ruler1-space": 5,
    "--ruler2-bdw": "1px",
    "--ruler2-c": "var(--ruler-color)",
    "--ruler2-h": "20px",
    "--ruler2-space": 10,
    "--ruler-unit": `${MM_TO_PX}px`,
  } as React.CSSProperties;

  return (
    <div className="hidden relative lg:block z-20">
      {/* Ruler background */}
      <div
        className={`fixed bg-white dark:bg-neutral-800 ${
          isHorizontal
            ? "left-8 right-0 top-0 h-8 border-b"
            : "left-0 top-8 bottom-0 w-8 border-r"
        } border-neutral-200 dark:border-neutral-700`}
        style={
          {
            ...rulerStyles,
            "--ruler-color": "var(--ruler-line-color)",
          } as React.CSSProperties
        }
      >
        {/* All lines container */}
        <div className="relative w-full h-full [--ruler-line-color:theme(colors.neutral.400)] dark:[--ruler-line-color:theme(colors.neutral.500)]">
          {/* Short lines - rendered every mm except at 10mm intervals */}
          {Array.from(
            { length: 120 * 10 },
            (_, i) =>
              i % 10 !== 0 && (
                <div
                  key={i}
                  className="absolute bg-neutral-400 dark:bg-neutral-500"
                  style={{
                    ...(isHorizontal
                      ? {
                          height: "10px",
                          width: "1px",
                          top: 0,
                          left: `${i * MM_TO_PX - scrollPosition}px`,
                        }
                      : {
                          width: "10px",
                          height: "1px",
                          left: 0,
                          top: `${i * MM_TO_PX - scrollPosition}px`,
                        }),
                  }}
                />
              )
          )}

          {/* Long lines - rendered every 10mm */}
          {Array.from({ length: 120 }, (_, i) => (
            <>
              <div
                key={`long-${i}`}
                className="absolute bg-neutral-400 dark:bg-neutral-500"
                style={{
                  ...(isHorizontal
                    ? {
                        height: "15px",
                        width: "1px",
                        top: 0,
                        left: `${i * 10 * MM_TO_PX - scrollPosition}px`,
                      }
                    : {
                        width: "15px",
                        height: "1px",
                        left: 0,
                        top: `${i * 10 * MM_TO_PX - scrollPosition}px`,
                      }),
                }}
              />
              {/* Number labels next to long lines */}
              <div
                key={`number-${i}`}
                className={`absolute text-[10px] text-neutral-500 dark:text-neutral-400 ${
                  isHorizontal ? "" : "rotate-90 origin-left"
                }`}
                style={{
                  ...(isHorizontal
                    ? {
                        top: "16px",
                        left: `${i * 10 * MM_TO_PX - scrollPosition + 2}px`,
                      }
                    : {
                        left: "16px",
                        top: `${i * 10 * MM_TO_PX - scrollPosition + 3}px`,
                        transformOrigin: "left center",
                      }),
                }}
              >
                {i * 10}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
