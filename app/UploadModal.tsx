import {X, Folder} from "lucide-react";

export default function UploadModal(){
    return(
        <div className="relative flex items-center justify-center p-20">
            <div className="absolute inset-0 -z-10 blur-3xl" 
            style={{
                background: "radial-gradient(circle at 30% 30%, rgba(134,239,172,0.5), transparent 50%), radial-gradient(circle at 70% 70%, rgba(253,224,71,0.4), transparent 50%)",
                }}/>
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-base tracking-tight text-black">Upload your file</h2>
                    <button className="text-gray-400 hover:text-black">
                        <X size={18}/>
                    </button>
                </div>
                <div className="mt-4 flex flex-col items-center jusitfy-center gap-3 rounded-xl bg-gray-50/50 px-6 py-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-300 to-green-500">
                        <Folder size={26} className="text-white" fill="white"/>
                    </div>

                    <p className="text-sm text-gray-500">
                        Drag and drop or{" "}
                        <span className="cursor-pointer text-green-600 underline">
                            choose file
                        </span>{" "}
                        to upload.
                    </p>
                    <p className="text-xs text-gray-400">
                        Image format: JPG, PNG &amp; SVG. Max 5.0MB
                    </p>
                </div>
            </div>
        </div>
    )
}