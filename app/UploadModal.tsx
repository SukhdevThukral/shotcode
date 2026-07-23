"use client";

import React, { useCallback, useRef, useState } from "react";
import {X, Folder} from "lucide-react";

const accepted_type = ["image/jpeg", "image/png", "image/svg+xml"];
const max_size_mbs = 5;

interface UplaodModalProps {
    onFileAccepted: (file: File) => void;
    onClose? : () => void;
}

export default function UploadModal({onFileAccepted, onClose}: UplaodModalProps){
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [progress, setProgress] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const validateAndAccept = useCallback(
        (file:File) => {
            setError(null);

            if(!accepted_type.includes(file.type)) {
                setError("Only JPG, PNG & SVG allowed.");
                return;
            }
            if(file.size > max_size_mbs * 1024 * 1024) {
                setError(`Max file size is ${max_size_mbs}MB.`);
                return;
            }

            if (intervalRef.current) clearInterval(intervalRef.current);
            
            setFileName(file.name);
            setProgress(0);

            intervalRef.current = setInterval(() => {
                setProgress((p) => {
                    if (p === null) return null;
                    if (p>=100) {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        return 100;
                    }
                    return p + 10;
                });
            }, 100);

            onFileAccepted(file);
        },
        [onFileAccepted]
    );

    React.useEffect(() => {
        return() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) validateAndAccept(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validateAndAccept(file);
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const item = Array.from(e.clipboardData.items).find((i) => 
            i.type.startsWith("image/")
        );
        if(item) {
            const file = item.getAsFile();
            if (file) validateAndAccept(file);
        }
    };

    return(
        <div className="relative flex items-center justify-center p-20"
        onPaste={handlePaste}
        tabIndex={0} >
            <div className="absolute -z-10 blur-2xl" 
            style={{
                width: "980px",
                height: "400px",
                background: "radial-gradient(circle at 30% 30%, rgba(134,239,172,0.5), transparent 50%), radial-gradient(circle at 70% 70%, rgba(253,224,71,0.4), transparent 50%)",
                }}/>
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-base tracking-tight text-black">Upload your file</h2>
                </div>

                <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} 
                     onDragLeave={() => setIsDragging(false)}
                     onDrop={handleDrop}
                     onClick={() => inputRef.current?.click()}
                     className={`relative mt-4 flex cursor-pointer flex-col items-center jusitfy-center gap-3 rounded-xl bg-gray-50/50 px-6 py-10 transition-colors`}>

                    <div className={`pointer-events-none absolute inset-0 rounded-xl bg-gray-500/20 backdrop-blur-[1px] transition-opacity duration-200 ${
                        isDragging ? "opacity-100":"opacity-0"
                    }`}/> 

                    <input ref={inputRef}
                        type="file"
                        accept={accepted_type.join(",")}
                        className="hidden"
                        onChange={handleInputChange}
                    />

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
                {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

                {fileName && progress !== null && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                        <div className="flex h-8 w-10 items-center justify-center rounded-md bg-black text-[9px] font-bold text-white">
                            {fileName.split(".").pop()?.toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="truncate max-w-[160px]">{fileName}</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-green-100">
                                <div className="h-full rounded-full bg-green-500 transition-all" style={{width: `${progress}%`}}/>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-black"
                        onClick={() => { setFileName(null); setProgress(null);}}>
                            <X size={16}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}