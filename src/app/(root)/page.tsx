import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-[1800px] px-3 py-4 sm:px-4">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          {/* Editor */}
          <div className="h-[60vh] sm:h-[500px] lg:h-[calc(100vh-140px)] min-h-0">
            <EditorPanel />
          </div>
          {/* Output */}
          <div className="min-h-[40vh] lg:min-h-[calc(100vh-140px)] min-h-0">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
