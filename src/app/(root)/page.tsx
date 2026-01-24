import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1800px] px-3 py-4 sm:px-4">
        <div className="relative z-10">
          <Header />
        </div>
        {/* MAIN CONTENT */}
        <div
          className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[calc(100vh-140px)]"
        >
          {/* Editor */}
          <div className="h-[60vh] sm:h-[500px] lg:h-full sm:w-full">
            <EditorPanel />
          </div>
          {/* Output */}
          <div className="h-[40vh] sm:h-[400px] lg:h-full sm:w-full">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
