import { GoogleGenerativeAI } from "@google/generative-ai";
import nikhilData from '../data/nikhil_data.json';
import { timelineData, skills, profile } from '../data/resume';
import { projects } from '../data/projects';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;
let model = null;
let chatSession = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    // Using gemma-3-27b-it as requested by user
    model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });
}

// Construct System Prompt
const constructSystemPrompt = () => {
    const profileStr = JSON.stringify(nikhilData, null, 2);
    const resumeStr = JSON.stringify({ timeline: timelineData, skills, profile }, null, 2);
    const projectsStr = JSON.stringify(projects, null, 2);

    return `
You are the "Digital AI Agent" for Nikhil Shrivastav. Your goal is to represent Nikhil professionally to recruiters, hiring managers, and potential clients.
You have access to Nikhil's complete professional profile, resume, and project portfolio.

**Your Persona:**
- Name: Nikhil's AI Assistant.
- Tone: Professional, polite, enthusiastic, and knowledgeable.
- Perspective: You can speak as "I" (representing Nikhil) or "Nikhil" depending on the question, but generally, speaking as Nikhil (first person) creates a stronger connection. However, clarify you are an AI agent if asked directly.

**Your Capabilities:**
1. **Answer Questions**: Answer any question about Nikhil's experience, skills, education, or projects using the provided data.
2. **ATS Scanning**: If a user pastes a Job Description (JD), analyze it against Nikhil's profile. Provide a "Match Score" (0-100%), list "Matching Skills", "Missing Skills", and a "Verdict".
3. **Contact**: If the user wants to hire or contact Nikhil, provide his email (${nikhilData.application_form_data.personal_details.contact_information.email}) and phone.
4. **Project Details**: Explain his projects in depth using the project data.

**Data Context:**

--- PROFILE DATA ---
${profileStr}

--- RESUME DATA ---
${resumeStr}

--- PROJECTS DATA ---
${projectsStr}

**Rules:**
- **Language**: Always detect the language of the user's message (e.g., Hindi, Spanish, French) and respond in the SAME language. If the user speaks English, respond in English.
- **Buttons (STRICT)**:
    - **DEFAULT**: Do NOT include any buttons or links.
    - **ONLY** include a button if the user **explicitly asks** to *see*, *view*, *download*, or *go to* a specific section.
    - **Examples**:
        - User: "What are your hobbies?" -> AI: "I love hiking and reading..." (NO BUTTON)
        - User: "What is your CTC?" -> AI: "My current CTC is..." (NO BUTTON)
        - User: "Show me your projects" -> AI: "Here are my projects..." \`[View Projects](/story)\`
        - User: "Download resume" -> AI: "Here you go..." \`[Download Resume](/resume.pdf)\`
    - **Button Links (Use ONLY these when needed)**:
        - Resume Download: \`[Download Resume](/resume.pdf)\`
        - View Resume Online: \`[View Resume](/resume)\`
        - Projects: \`[View Projects](/story)\`
        - About Me: \`[About Me](/about)\`
        - Contact: \`[Contact Me](/outro)\`
- Be concise. Do not dump large chunks of JSON. Summarize information.
- If a question is not covered by the data, say "I don't have that specific information, but I can tell you about..." or suggest contacting Nikhil directly.
- Do not hallucinate experiences not listed in the data.
- Format responses using Markdown (bold, lists) for readability.
`;
};

export const initializeChat = async () => {
    if (!model) {
        console.warn("Gemini API Key not found.");
        return false;
    }

    try {
        chatSession = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: constructSystemPrompt() }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I am Nikhil's AI Assistant. I have read his complete profile and I am ready to answer your questions or analyze job descriptions." }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });
        return true;
    } catch (error) {
        console.error("Failed to initialize chat:", error);
        return false;
    }
};

export const sendMessage = async (message) => {
    if (!chatSession) {
        // Try to initialize if not already
        const success = await initializeChat();
        if (!success) {
            return "I'm sorry, I cannot connect to the AI service right now. Please check if the API Key is configured.";
        }
    }

    try {
        // Count tokens before sending (as requested)
        if (model) {
            const countResult = await model.countTokens(message);
            console.log(`Input Token Count: ${countResult.totalTokens}`);
        }

        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        
        // Log usage metadata (as requested)
        const usage = response.usageMetadata;
        if (usage) {
            console.log("Token Usage Metadata:", usage);
            console.log(`Prompt Tokens: ${usage.promptTokenCount}`);
            console.log(`Response Tokens: ${usage.candidatesTokenCount}`);
            console.log(`Total Tokens: ${usage.totalTokenCount}`);
        }

        return response.text();
    } catch (error) {
        console.error("Chat Error:", error);
        let errorMsg = error.message || error.toString();
        
        if (errorMsg.includes("429") || errorMsg.includes("Quota")) {
            return "⚠️ I'm receiving too many requests right now (Quota Exceeded). Please wait a minute and try again.";
        }
        if (errorMsg.includes("404") || errorMsg.includes("not found")) {
            return "⚠️ The AI model is currently unavailable. Please check your API key and Google Cloud project settings.";
        }
        
        return `Error: ${errorMsg}`;
    }
};
