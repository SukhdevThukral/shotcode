import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* <span className="font-md" style={{fontFamily: "Gelica"}}>
        Design interfaces.<br/> Let AI write the components
      </span> */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-15 pt-20 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <h1 className="font-serif font-medium text-5xl leading-tight tracking-tight text-black md:text-6xl">
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
    </main>
  );
}
