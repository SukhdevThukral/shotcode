import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-300">
        <div className="flex max-w-7xl w-full mx-auto px-15 py-4 ">
            <div className="flex gap-12">
                <div className="flex items-center">
                    <Image
                        src="/logo1.png"
                        alt="Shotcode Logo"
                        width={280}
                        height={280}
                    />
                </div>
                <div className="mt-6">
                    <span className="text-sm text-gray-400">Build Better Components :D</span>
                </div>
            </div>
        </div>
    </header>
  );
}
