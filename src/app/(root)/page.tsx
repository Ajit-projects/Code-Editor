import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import Header from "./_components/Header";

export default function Home() {
  
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 min-[1024px]:grid-cols-2 gap-4">
          {/* Reserve Editor space until it's ready */}
          <div className="min-h-[500px]"> 
            <EditorPanel />
          </div>

          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
