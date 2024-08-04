import CanvasDisplay from "../components/LInkedListVisualizer/CanvasDisplay/CanvasDisplay";

export default function LinkedListVisualizer(params: any) {
  return (
    <div>
      <div className="h-1/2 w-1/2">
        <CanvasDisplay />
      </div>
    </div>
  );
}
