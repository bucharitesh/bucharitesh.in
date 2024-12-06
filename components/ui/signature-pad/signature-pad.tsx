"use client";

import type {
  HTMLAttributes,
  MouseEvent,
  PointerEvent,
  TouchEvent,
  EffectCallback,
  ForwardedRef,
} from "react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { StrokeOptions } from "perfect-freehand";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "./helper";
import { Point } from "./point";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const unsafe_useEffectOnce = (callback: EffectCallback) => {
  return useEffect(callback, []);
};

export interface SignaturePadRef {
  clear: () => void;
  isEmpty: () => boolean;
  getData: () => string | null;
}

export type SignaturePadProps = Omit<
  HTMLAttributes<HTMLCanvasElement>,
  "onChange"
> & {
  onChange?: (_signatureDataUrl: string | null) => void;
  containerClassName?: string;
  disabled?: boolean;
  defaultValue?: string;
  onClear?: () => void;
};

export const SignaturePad = forwardRef(function SignaturePad(
  {
    className,
    containerClassName,
    defaultValue,
    onChange,
    onClear,
    disabled = false,
    ...props
  }: SignaturePadProps,
  ref: ForwardedRef<SignaturePadRef>
) {
  const $el = useRef<HTMLCanvasElement>(null);
  const $imageData = useRef<ImageData | null>(null);
  const [dpi, setDpi] = useState(1);

  const { theme } = useTheme();

  const [isPressed, setIsPressed] = useState(false);
  const [lines, setLines] = useState<Point[][]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);

  // Get DPI on mount
  useEffect(() => {
    setDpi(window.devicePixelRatio || 1);
  }, []);

  // Expose methods through ref
  useImperativeHandle(
    ref,
    () => ({
      clear: () => {
        onClearClick();
      },
      isEmpty: () => lines.length === 0 && currentLine.length === 0,
      getData: () => $el.current?.toDataURL() || null,
    }),
    [lines, currentLine]
  );

  // Initialize canvas with correct scaling
  useEffect(() => {
    if (!$el.current) return;

    const canvas = $el.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpi;
    canvas.height = rect.height * dpi;
    ctx.scale(dpi, dpi);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [dpi]);

  const perfectFreehandOptions = useMemo(() => {
    const size = $el.current
      ? Math.min($el.current.height, $el.current.width) * 0.006
      : 4;

    return {
      size,
      thinning: 0.5,
      streamline: 0.6,
      smoothing: 0.65,
      end: {
        taper: size * 1.5,
      },
      start: {
        taper: size * 0.5,
      },
    } satisfies StrokeOptions;
  }, []);

  const getCanvasPoint = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (!$el.current) return new Point(0, 0);

    const rect = $el.current.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;

    return new Point(clientX - rect.left, clientY - rect.top);
  };

  const onMouseDown = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    setIsPressed(true);
    const point = getCanvasPoint(event);
    setCurrentLine([point]);
  };

  const onMouseMove = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    if (!isPressed || !$el.current) {
      return;
    }

    const point = getCanvasPoint(event);

    if (
      currentLine.length === 0 ||
      point.distanceTo(currentLine[currentLine.length - 1]) > 2
    ) {
      setCurrentLine([...currentLine, point]);

      const ctx = $el.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, $el.current.width / dpi, $el.current.height / dpi);
        ctx.fillStyle = theme === "dark" ? "white" : "black";

        lines.forEach((line) => {
          const pathData = new Path2D(
            getSvgPathFromStroke(getStroke(line, perfectFreehandOptions))
          );
          ctx.fill(pathData);
        });

        const pathData = new Path2D(
          getSvgPathFromStroke(
            getStroke([...currentLine, point], perfectFreehandOptions)
          )
        );
        ctx.fill(pathData);
      }
    }
  };

  const onMouseUp = (
    event: MouseEvent | PointerEvent | TouchEvent,
    addLine = true
  ) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    setIsPressed(false);
    const point = getCanvasPoint(event);

    const newLines = [...lines];
    if (addLine && currentLine.length > 0) {
      newLines.push([...currentLine, point]);
      setCurrentLine([]);
    }

    setLines(newLines);

    if ($el.current && newLines.length > 0) {
      const ctx = $el.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, $el.current.width / dpi, $el.current.height / dpi);
        ctx.fillStyle = theme === "dark" ? "white" : "black";

        newLines.forEach((line) => {
          const pathData = new Path2D(
            getSvgPathFromStroke(getStroke(line, perfectFreehandOptions))
          );
          ctx.fill(pathData);
        });

        onChange?.($el.current.toDataURL());
      }
    }
  };

  const onMouseEnter = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    if ("buttons" in event && event.buttons === 1) {
      onMouseDown(event);
    }
  };

  const onMouseLeave = (event: MouseEvent | PointerEvent | TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    if (isPressed) {
      const point = getCanvasPoint(event);
      if (currentLine.length > 0) {
        setLines([...lines, [...currentLine, point]]);
        setCurrentLine([]);
      }
      setIsPressed(false);
    }
  };

  const onClearClick = () => {
    if ($el.current) {
      const ctx = $el.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, $el.current.width / dpi, $el.current.height / dpi);
      }
      $imageData.current = null;
    }

    onChange?.(null);
    onClear?.();
    setLines([]);
    setCurrentLine([]);
  };

  useEffect(() => {
    onClearClick();
  }, []);

  unsafe_useEffectOnce(() => {
    if ($el.current && typeof defaultValue === "string") {
      const ctx = $el.current.getContext("2d");
      if (!ctx) return;

      const { width, height } = $el.current;
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(
          img,
          0,
          0,
          Math.min(width / dpi, img.width),
          Math.min(height / dpi, img.height)
        );

        const defaultImageData = ctx.getImageData(
          0,
          0,
          width / dpi,
          height / dpi
        );
        $imageData.current = defaultImageData;
      };

      img.src = defaultValue;
    }
  });

  return (
    <div
      className={cn("relative block", containerClassName, {
        "pointer-events-none opacity-50": disabled,
      })}
    >
      <canvas
        ref={$el}
        className={cn(
          "relative block dark:hue-rotate-180 dark:invert",
          className
        )}
        style={{ touchAction: "none" }}
        onPointerMove={onMouseMove}
        onPointerDown={onMouseDown}
        onPointerUp={onMouseUp}
        onPointerLeave={onMouseLeave}
        onPointerEnter={onMouseEnter}
        {...props}
      />

      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          className="focus-visible:ring-ring ring-offset-background text-muted-foreground/60 hover:text-muted-foreground rounded-full p-0 text-[0.688rem] focus-visible:outline-none focus-visible:ring-2"
          onClick={onClearClick}
        >
          Clear Signature
        </button>
      </div>
    </div>
  );
});

SignaturePad.displayName = "SignaturePad";
