import { Mail , AtSign } from "lucide-react";

const footerColumns = [
    {
        heading: "Home",
        links: ["Benefits", "Features"],
    },
    {
        heading: "Platform",
        links: ["Solution", "Overview", "Portfolio"],

    },
    {
        heading: "About Us",
        links: ["Connectors", "Secuirty", "Contact Us"]
    },
];

export default function Footer(){
    return (
        <section className="px-4 py-10 md:px-10">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 pt-14 pb-8 md:px-14 md:pt-16"
            style={{background: "radial-gradient(120% 90% at 15% 0%, #10B981  0%, #58c942 50%, #030712 100%)",}}>
                <div className="pointer-events-none absolute inset-0" style={{background: "radial-gradient(45% 35% at 55% 55%, rgba(230, 226, 255, 0.55) 0%, rgba(20,14,56,0) 70%)",}} aria-hidden="true"/>
                <div className="relative">
                    <h2 className="max-w-md text-4xl font-normal leading-tight text-white md:text-5xl">
                        Collab ;p?
                    </h2>
                    <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-opacity hover:opacity-90">
                        Contact Me
                    </button>
                </div>
                <div className="relative mt-14 flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                        <a href="#" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                            <Mail size={16}/>
                        </a>
                        <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                            <AtSign
                             size={16}/>
                        </a>
                    </div>
                    <p className="text-xs text-white/50">© 2026 ShotCode.</p>
                </div>
            </div>
        </section>
    );
}