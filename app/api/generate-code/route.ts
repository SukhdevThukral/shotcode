import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { stat } from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const accepted_type = ["image/jpeg", "image/png", "image/svg+xml"];
const max_size_mbs = 5;

const sys_arch = `

You are a senior frotend engineer. You will be given an image of a UI component design.

Transform this component design into clean, production-safe code. Follow this architecture:

1. Analyse the layout, spacing, typography, and colors precisely from the image.
2. Output a single, self-contained component (no manual wiring required fromt the consumer).
3. use semantic HTML and accesssible attributes (aria-labels, roles) where relevant.
4. Use Tailwind CSS utility classes for styling - no inline styles unless dynamic values require it.
5. IF interactive states are visible (hover,focus,active,disabled) - use them.
6. Do no invent business logic or data, only use whats visually present.
7. RETURN ONLY THE CODE, no explanations, no markdown fences, no commentary.
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

        const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});

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