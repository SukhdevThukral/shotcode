import {X, Folder} from "lucide-react";

export default function UploadModal(){
    return(
        <div className="w-full max-w-md roudned-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-black">Upload your file</h2>
                <button className="text-gray-400 hover:text-black">
                    <X size={18}/>
                </button>
            </div>
            <div className="mt-4 flex flex-col items-center jusitfy-center gap-3 rounded-xl border border-dashed border-grap-300 bg-gray-50/50 px-6 py-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-300 to-green-500">
                    <Folder size={26} className="text-white" fill="white"/>
                </div>
            </div>
        </div>
    )
}