import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { stat } from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const accepted_type = ["image/jpeg", "image/png", "image/svg+xml"];
const max_size_mbs = 5;

const sys_arch = `

You are a senior frotend engineer specializing in pixel-accurate UI implementation. You will be given an image of a UI component design.

Transform it into clean, production-safe code by following this architecture exactly:

1. VISUAL ANALYSIS (do this precisely, do not default to generic assumptions):
   - Extract exact colors as hex codes from the image for BOTH text/foreground AND background/container elements — a background color is never optional, even if it appears to be black, white, or transparent. Map each to the closest Tailwind utility, but if no close match exists (>5% deviation), use an arbitrary value like bg-[#f0efed] instead of forcing a default Tailwind color.
   - Detect text alignment exactly as shown (left/center/right) — do not default to centered layouts.
   - Detect font weight, style, and letter-spacing (tight/condensed/wide) as precisely as possible from stroke width and character spacing. Choose the closest available Tailwind/system font stack and note the match in a code comment if not exact.
   - Measure relative spacing (gaps, padding, line-height) proportionally from the image rather than using default Tailwind spacing scale values by habit.

2. Output a single, self-contained component requiring no manual wiring from the consumer.
3. Use correct semantic HTML structure:
   - Use exactly one top-level heading element (h1) per component — never multiple sibling h1/h2 tags for what is visually one heading block. If a heading spans multiple visual lines (e.g. due to styling differences like italics on one line), use a single h1 containing <span> elements or <br/> for the line breaks, styling each span independently as needed.
   - Use aria-labels, roles, and alt text where relevant for non-text or interactive elements.
4. Use Tailwind CSS utility classes for styling — no inline styles unless a dynamic/arbitrary value requires it (e.g. exact hex colors, precise spacing not on the Tailwind scale).
5. Implement interactive states (hover, focus, active, disabled) only if visually indicated or implied by the component type (e.g. a button should have a hover state even if not explicitly shown).
6. Do not invent business logic or data. Any text visible in the image should be used as the default/fallback value for its corresponding prop — not left as a required prop with no default.
7. If any visual property (exact font family, precise color) cannot be determined with confidence, add a single-line code comment noting the assumption made — but do not add prose outside the code.
8. Return ONLY the code. No explanations, no markdown fences, no commentary before or after.

`;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const framework = (formData.get("framework") as string) || "react";

        if(!file) {
            return NextResponse.json({error: "No file provided"}, {status:400});
        }

        if (!accepted_type.includes(file.type)){
            return NextResponse.json({error: "Unsupported file type"}, {status:400});
        }
        if(file.size > max_size_mbs * 1024 * 1024){
            return NextResponse.json({error: "File too large"}, {status:400});
        }

        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        const model = genAI.getGenerativeModel({model:"gemini-2.5-flash-lite"});

        const result = await model.generateContent([
            sys_arch + `\n\nTarget framework: ${framework === "vue" ? "Vue 3 (Composition API, <script setup>)": "React (functional component, Typescript)"}`,
            {
                inlineData: {
                    mimeType: file.type,
                    data: base64Data,
                },
            },
        ]);
        const code = result.response.text();

        return NextResponse.json({ code });
    } catch(err) {
        console.error("Gemini generation error:", err);
        return NextResponse.json({ error: "Generation failed" }, {status:500});
    }
}