import { useEffect, useRef } from "react";

export default function CanvasDisplay() {
  const height = 1000;
  const width = 1000;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement =
      canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    //context.fillStyle = "red";
    //context.fillRect(0, 0, width, height);
  }, []);

  return <canvas ref={canvasRef} style={{ height: "100%", width: "100%" }} />;
}
