"use client"
import { useState } from "react";
import UploadModal from "./UploadModal";
import CodeEditorPanel from "./CodeEditorPanel";
import ExamplePanel from "./ExamplePanel";

export default function Home() {
  const [framework, setFramework] = useState<"react" | "vue">("react");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const handleFileAccepted = async (file: File) => {
    setIsGenerating(true);
    setGenError(null);
    setGeneratedCode(null);

    try{
      const formData = new FormData();
      formData.append("file", file);
      formData.append("framework", framework);

      const res = await fetch("/api/generate-code", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed" );
      }

      const data = await res.json();
      setGeneratedCode(data.code);
    } catch(err) {
      setGenError(err instanceof Error? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const showPanel = isGenerating || !!generatedCode;

  return (
    <main className="relative overflow-hidden pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-15 pt-20 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <h1 className="font-serif font-medium text-5xl leading-tight tracking-tight text-black md:text-6xl ">
            Design interfaces. Let <br/>AI write the{" "} 
            <span className="bg-green-400 px-2 py-[0px] leading-none">code</span>
          </h1>

          <button className="flex items-center gap-2 mt-10 bg-blue-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            <span>Generate with AI  </span>

            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
            </svg>
          </button>

        </div>
        <p className="max-w-xs text-sm leading-relaxed text-gray-500 md:pt-10">
          Instantly transform your component designs into clean,
          production-safe React or Vue code without manual wiring
        </p>
      </div>

      

      <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-15 transition-all duration-500 md:grid-cols-2">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-gray-400">Output as:</span>
            <div className="flex rounded-full border border-gray-200 p-0.5">
              <button onClick={() => setFramework("react")}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    framework === "react" ? "bg-green-400 text-black" : "text-gray-400"
              }`}>
                React
              </button>
              <button onClick={() => setFramework("vue")}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    framework === "vue" ? "bg-green-400 text-black" : "text-gray-400"
              }`}>
                Vue
              </button>          
            </div>
          </div>
          <UploadModal onFileAccepted={handleFileAccepted}/>
          {genError && (
            <p className="mt-4 text-center text-sm text-red-500">{genError}</p>
          )}
        </div>

        <div className="flex h-full flex-col min-w-0">
          <div className="h-16 shrink-0" aria-hidden="true"/>
          <div className="min-h-[420px] min-w-0 flex-1 animate-[panelIn_0.4s_ease]">
            {showPanel ? (
              <CodeEditorPanel code={generatedCode} isGenerating={isGenerating}/>
            ):(
              <ExamplePanel/>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
