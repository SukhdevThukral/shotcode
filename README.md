
# shotcode

_shotcode turns a screenshot of a UI component into clean, working React or Vue code._ <br><br>
![license](https://img.shields.io/badge/license-MIT-black)

<img width="1145" height="893" alt="shotcode" src="https://github.com/user-attachments/assets/c9d320f3-4912-4576-9a2d-20c629b1b9cd" />
<br><br><br>

**Upload an image of a button, card, form, or full section, shotcode analyzes the layout, spacing, and styling on the website, then generates absolutely ready-to-use component code.**

## Features:

-  ss-to-code: Upload any UI screenshot and get back React or Vue component code
-  style-aware generation: infers spacing, colors, and layout structure from the image
-  powered by Google Gemini: uses multimodal AI to read and interpret UI screenshots


## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Icons:** ```lucide-react```


## Features

-  Fast performance
-  Simple and Modern UI :D

## Prerequisites [if not using the hosted website ): ]

- Node.js 18+
- pnpm (npm install -g pnpm or corepack enable)
- A Google Generative AI API key

### Installation

```
git clone https://github.com/SukhdevThukral/shotcode.git
cd shotcode
pnpm install
```
### Environment 
Create a .env.local file in the project root:

```
GEMINI_API_KEY=your_api_key_here
```

### Run Locally
```
pnpm dev
```
---

Open http://localhost:3000 to view it in the browser.

## License

MIT

---
