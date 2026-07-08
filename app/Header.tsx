import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
        <div className="flex w-full px-15 py-4 ">
            <div className="flex gap-8 items-baseline">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Shotcode Logo"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="text-xl font-medium text-black">ShotCode</div>
                <div>
                    <span className="text-xs text-gray-400">Build Better Components ;D</span>
                </div>
            </div>
        </div>
    </header>
  );
}
