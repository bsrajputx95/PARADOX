export async function textToSpeech(text: string, _voiceId: string = 'default'): Promise<string | null> {
    if (!text || text.trim().length === 0) {
        return null;
    }

    try {
        return synthesizeSpeechBrowser(text);
    } catch (error) {
        console.error('TTS error:', error);
        return null;
    }
}

function synthesizeSpeechBrowser(text: string): string {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.3;
        utterance.volume = 1.0;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);

        return 'browser-tts';
    }

    return '';
}

export function speak(text: string): void {
    console.log('🎤 Speaking:', text);

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.3;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';

        const voices = window.speechSynthesis.getVoices();
        const preferredVoices = voices.filter(voice =>
            voice.lang.includes('en') &&
            (voice.name.includes('Google US English') ||
                voice.name.includes('Microsoft David') ||
                voice.name.includes('Alex') ||
                voice.name.includes('Daniel'))
        );

        if (preferredVoices.length > 0) {
            utterance.voice = preferredVoices[0];
        }

        utterance.onstart = () => console.log('✅ Speech started');
        utterance.onend = () => console.log('✅ Speech ended');
        utterance.onerror = (e) => console.error('❌ Speech error:', e);

        window.speechSynthesis.speak(utterance);
    } else {
        console.error('❌ Speech synthesis not supported');
    }
}

export function stopSpeaking(): void {
    console.log('🛑 Stopping speech');
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}
