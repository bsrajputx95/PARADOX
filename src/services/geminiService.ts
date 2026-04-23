import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
    console.warn('⚠️ VITE_GEMINI_API_KEY not set. Using local fallback for AI analysis.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface ErrorDetail {
    type: 'math' | 'spelling' | 'grammar' | 'general';
    position: { start: number; end: number };
    userText: string;
    correction: string;
    explanation: string;
}

export interface AnalysisResult {
    hasErrors: boolean;
    feedback: string;
    corrections?: string[];
    type: 'spelling' | 'grammar' | 'math' | 'explanation' | 'question' | 'general' | 'none';
    errors?: ErrorDetail[];
}

// Live analysis with faster response time
export async function analyzeLive(text: string): Promise<AnalysisResult> {
    console.log('🔍 Live analyzing:', text);

    if (!text || text.trim().length < 3) {
        return {
            hasErrors: false,
            feedback: '',
            type: 'none'
        };
    }

    // Quick local checks first (instant feedback)
    const localErrors = detectLocalErrors(text);
    if (localErrors.length > 0) {
        const firstError = localErrors[0];
        console.log('⚡ Local error detected:', firstError);
        return {
            hasErrors: true,
            feedback: firstError.explanation,
            type: firstError.type,
            errors: localErrors
        };
    }

    // Then do AI analysis for complex issues
    return analyzeText(text);
}

// Detect common errors locally (instant, no API call)
function detectLocalErrors(text: string): ErrorDetail[] {
    const errors: ErrorDetail[] = [];

    // Math error detection (e.g., "5+3=9")
    const mathPattern = /(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/g;
    let match;

    while ((match = mathPattern.exec(text)) !== null) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const userAnswer = parseInt(match[3]);
        const correctAnswer = num1 + num2;

        if (userAnswer !== correctAnswer) {
            errors.push({
                type: 'math',
                position: { start: match.index, end: match.index + match[0].length },
                userText: match[0],
                correction: `${num1}+${num2}=${correctAnswer}`,
                explanation: `Actually, ${num1} + ${num2} = ${correctAnswer}, not ${userAnswer}`
            });
        }
    }

    // Subtraction errors
    const subPattern = /(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/g;
    while ((match = subPattern.exec(text)) !== null) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const userAnswer = parseInt(match[3]);
        const correctAnswer = num1 - num2;

        if (userAnswer !== correctAnswer) {
            errors.push({
                type: 'math',
                position: { start: match.index, end: match.index + match[0].length },
                userText: match[0],
                correction: `${num1}-${num2}=${correctAnswer}`,
                explanation: `Looks like ${num1} - ${num2} = ${correctAnswer}, not ${userAnswer}`
            });
        }
    }

    // Multiplication errors
    const mulPattern = /(\d+)\s*[x*×]\s*(\d+)\s*=\s*(\d+)/g;
    while ((match = mulPattern.exec(text)) !== null) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const userAnswer = parseInt(match[3]);
        const correctAnswer = num1 * num2;

        if (userAnswer !== correctAnswer) {
            errors.push({
                type: 'math',
                position: { start: match.index, end: match.index + match[0].length },
                userText: match[0],
                correction: `${num1}×${num2}=${correctAnswer}`,
                explanation: `Actually, ${num1} × ${num2} = ${correctAnswer}, not ${userAnswer}`
            });
        }
    }

    return errors;
}

export async function analyzeText(text: string): Promise<AnalysisResult> {
    console.log('🔍 Analyzing text:', text);

    if (!text || text.trim().length < 3) {
        return {
            hasErrors: false,
            feedback: '',
            type: 'none'
        };
    }

    // Use local fallback if API key is not configured
    if (!genAI) {
        console.log('📦 Using local fallback (no API key configured)');
        return provideLocalHelp(text);
    }

    try {
        console.log('🚀 Calling Gemini API...');
        const model = genAI.getGenerativeModel({
            model: 'gemini-pro',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        const prompt = `You are a friendly AI tutor. A student wrote: "${text}"

Understand what they're asking and respond specifically:

- If they ask to EXPLAIN a math equation → Explain that exact equation with examples
- If they ask a question → Answer their specific question
- If they ask "how are you" → Respond warmly
- If they made an error → Point it out kindly

Keep it SHORT (2-3 sentences), friendly, and SPECIFIC to their exact question.

Examples:
"explain me x2+y=1" → "This is a parabola! x² means x×x. For example, if x=2, then 4+y=1, so y=-3. The graph curves like a U!"
"how are you?" → "I'm great! Ready to help you learn. What topic shall we explore?"

Your response:`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const feedback = response.text().trim();

        console.log('✅ Gemini response:', feedback);

        // Determine type from content
        const lowerFeedback = feedback.toLowerCase();
        let type: AnalysisResult['type'] = 'general';

        if (lowerFeedback.includes('equation') || lowerFeedback.includes('solve') || lowerFeedback.includes('math') || lowerFeedback.includes('parabola')) {
            type = 'math';
        } else if (text.toLowerCase().includes('explain') || text.toLowerCase().includes('what is')) {
            type = 'explanation';
        }

        return {
            hasErrors: true,
            feedback: feedback,
            type: type
        };
    } catch (error: any) {
        console.error('❌ Gemini API error:', error);
        console.error('Error details:', error.message);

        // Provide helpful local fallback
        return provideLocalHelp(text);
    }
}

// Local fallback when API fails - conversational responses
function provideLocalHelp(text: string): AnalysisResult {
    const lower = text.toLowerCase();

    // Conversational responses
    if (lower.includes('how are you') || lower.includes('how r u')) {
        return {
            hasErrors: true,
            feedback: "I'm doing great, thanks for asking! I'm here and ready to help you learn. What would you like to work on today?",
            type: 'general'
        };
    }

    if (lower.includes('am i doing') || lower.includes('am i correct') || lower.includes('is this right')) {
        return {
            hasErrors: true,
            feedback: "You're on the right track! Keep going, and feel free to ask if you need clarification on any step.",
            type: 'general'
        };
    }

    if (lower.includes('thank') || lower.includes('thanks')) {
        return {
            hasErrors: true,
            feedback: "You're very welcome! I'm happy to help. Learning together is the best way!",
            type: 'general'
        };
    }

    if (lower.includes('help me') || lower.includes('i need help')) {
        return {
            hasErrors: true,
            feedback: "Of course! I'm here to help. Tell me what you're working on, or ask me to explain any concept you'd like to understand better.",
            type: 'general'
        };
    }

    // Explanation requests
    if (lower.includes('explain') || lower.includes('what is')) {
        if (lower.includes('x2') || lower.includes('x^2') || lower.includes('equation')) {
            return {
                hasErrors: true,
                feedback: "This looks like a math equation! x² means x×x (x squared). For example, in x²+y=1, if x=2, then 4+y=1, so y=-3!",
                type: 'explanation'
            };
        }
        if (lower.includes('variable') || lower.includes('x')) {
            return {
                hasErrors: true,
                feedback: "A variable (like x or y) is an unknown value we're trying to find! It's like a mystery box - we use math to figure out what number belongs inside.",
                type: 'explanation'
            };
        }
    }
    if (lower.includes('how to solve') || lower.includes('how do i')) {
        return {
            hasErrors: true,
            feedback: "Great question! To solve most equations, follow these steps: 1) Identify what you're solving for, 2) Isolate that variable on one side, 3) Perform the same operation on both sides. What specific problem are you working on?",
            type: 'explanation'
        };
    }

    // Generic help
    return {
        hasErrors: true,
        feedback: "I'm here to help! Try asking me to explain a concept (like 'explain equations') or write a math problem for me to check!",
        type: 'general'
    };
}
