"use client"
import { useState } from "react";
import UploadModal from "./UploadModal";

export default function Home() {
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
      formData.append("framework", "react");

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

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-15 pt-20 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <h1 className="font-serif font-medium text-5xl leading-tight tracking-tight text-black md:text-6xl ">
            Design interfaces. Let <br/>AI write the{" "} 
            <span className="bg-green-400 px-2 py-[0px] leading-none">code</span>
          </h1>

          <button className="mt-8 rounded-full bg-blue px-6 py-3 text-sm font-medium text-mdium text-white hover: bg-gray-800 transition-colors">
            Generate with AI
          </button>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-gray-500 md:pt-10">
          Instantly transform your component designs into clean,
          production-safe React or Vue code without manual wiring
        </p>
      </div>

      <UploadModal 
      onFileAccepted={handleFileAccepted}/>

      {isGenerating && (
        <p className="text-center text-sm text-gray-500 mt-6">Generating code...</p>
      )}
      {genError && (
        <p className="text-center text-sm text-red-500 mt-6">{genError}</p>
      )}
      {generatedCode && (
        <pre className="mx-auto mt-6 max-w-3xl overflow-x-auto rounded-xl bg-black p-4 text-xs text-green-300">
          <code>{generatedCode}</code>
        </pre>
      )}
    </main>
  );
}
