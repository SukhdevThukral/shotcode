"use client"

import { useMemo, useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export type TokenType = "comment" | "string" | "number" | "keyword" | "identifier" | "function" | "plain";

interface Token {
    text: string;
    type: TokenType;
}

const KEYWORDS = new Set([
  "import", "export", "default", "const", "let", "var", "function", "return",
  "await", "async", "new", "class", "interface", "extends", "implements",
  "type", "as", "if", "else", "for", "while", "switch", "case", "break",
  "continue", "try", "catch", "finally", "throw", "typeof", "instanceof",
  "in", "of", "null", "undefined", "true", "false", "this", "super", "void",
  "yield", "delete", "from", "public", "private", "protected", "readonly",
  "static", "enum", "namespace", "declare",
])

const token_regex = 
  /(\/\/.*$)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/gm;

export const token_colors: Record<TokenType, string> = {
  comment: "text-neutral-400",
  string: "text-orange-600",
  number: "text-teal-600",
  keyword: "text-purple-600",
  function: "text-blue-600",
  identifier: "text-neutral-800",
  plain: "text-neutral-800",
}

export function tokenizeLine(line: string): Token[] {
    const tokens: Token[] = [];
    let lastIndex = 0;

    for (const match of line.matchAll(token_regex)) {
        if (match.index > lastIndex) {
            tokens.push({ text: line.slice(lastIndex, match.index), type: "plain"});
        }

        const [full, comment, str, num, word] = match;

        lastIndex = match.index + full.length;
    }
    if (lastIndex < line.length) {
        tokens.push({text: line.slice(lastIndex), type: "plain"});
    }
    return tokens;
}

const SKELETON_WIDTHS = [
  "w-3/5", "w-4/5", "w-2/5", "w-full", "w-1/3",
  "w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-full",
  "w-1/4", "w-3/5",
];

interface CodeEditorPanelProps {
    code: string | null;
    isGenerating: boolean;
    fileName?: string;
}

function CodeLine({ line, index }: { line: string; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), Math.min(index * 20, 500));
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`flex px-3 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      <span className="mr-3 w-5 shrink-0 select-none text-right text-neutral-300">
        {index + 1}
      </span>
      <span className="whitespace-pre">
        {tokenizeLine(line).map((t, j) => (
          <span key={j} className={token_colors[t.type]}>{t.text}</span>
        ))}
        {line === "" && "\u00A0"}
      </span>
    </div>
  );
}


export default function CodeEditorPanel({
    code,
    isGenerating,
    fileName = "Component.tsx",
}: CodeEditorPanelProps) {
    const [copied, setCopied] = useState(false);
    const lines = useMemo(() => (code ? code.split("\n") : []), [code]);

    const handleCopy = async () => {
        if (!code) return;
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if(!isGenerating && !code) return null;

    return (
        <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400"/>
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"/>
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400"/>
                    <span className="ml-3 font-mono text-xs text-neutral-500">{fileName}</span>
                </div>
                {code && (
                    <button onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/10 hover:text-black">
                        {copied ? <Check size={13}/> : <Copy size={13}/>}
                        {copied ? "Copied":"Copy"}
                    </button>
                )}
            </div>
            <div className="min-w-0 flex-1 overflow-auto py-3 font-mono text-[11px] leading-5">
                {isGenerating && !code && (
                    <div className="flex flex-col gap-2.5 px-4">
                        {SKELETON_WIDTHS.map((w, i) => (
                            <div key={i} 
                            style={{animationDelay:`${i * 80}ms`}}
                           className={`h-3.5 ${w} rounded bg-[linear-gradient(90deg,#e5e5e5_25%,#f2f2f2_37%,#e5e5e5_63%)] bg-[length:400px_100%] animate-[shimmer_1.4s_ease-in-out_infinite]`}/>
                        ))}
                    </div>
                )}
                {code && (
                    <div>
                        {lines.map((line, i) => (
                            <CodeLine key={i} line={line} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}