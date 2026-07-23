"use client"

import { tokenizeLine,token_colors } from "./CodeEditorPanel"
 
const EXAMPLE_CODE = `import React from 'react';


interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

export default function Button({
  label = "Get Started",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-green-400 px-6 py-3 text-sm font-medium text-black hover:bg-green-500 transition-colors"
    >
      {label}
    </button>
  );
}`;
const EXAMPLE_LINES = EXAMPLE_CODE.split("\n");


export default function ExamplePanel() {

    return (
        <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400"/>
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"/>
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400"/>
                    <span className="ml-3 font-mono text-xs text-neutral-500">Button.tsx</span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                    Example
                </span>
            </div>
            <div className="flex-1 overflow-auto py-3 font-mono text-[11px] leading-5 opacity-70">
                {EXAMPLE_LINES.map((line, i) => (
                <div key={i} className="flex px-3">
                    <span className="mr-3 w-5 shrink-0 select-none text-right text-neutral-300">
                    {i + 1}
                    </span>
                    <span className="whitespace-pre">
                    {tokenizeLine(line).map((t, j) => (
                        <span key={j} className={token_colors[t.type]}>
                        {t.text}
                        </span>
                    ))}
                    {line === "" && "\u00A0"}
                    </span>
                </div>
                ))}
            </div>
            <div className="border-t border-neutral-100 px-4 py-3 text-center text-xs text-neutral-400">
                Upload a design to generate real code like this!
            </div>
        </div>
    );
}