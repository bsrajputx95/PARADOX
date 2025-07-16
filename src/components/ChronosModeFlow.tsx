import React, { useState } from 'react';
import { ChronosModeSelector } from './ChronosModeSelector';
import { StoryModeTopicInput } from './StoryModeTopicInput';
import { VisualizeTopicInput } from './VisualizeTopicInput';
import { StoryModeBuffer } from './StoryModeBuffer';
import { StoryModeSplitScreen } from './StoryModeSplitScreen';
import { PanoramaViewer } from './PanoramaViewer';

interface ChronosModeFlowProps {
    onBack: () => void;
}

type FlowStage = 'mode-select' | 'visualize-input' | 'visualize-buffer-1' | 'visualize-buffer-2' | 'visualize-viewer' | 'story-input' | 'story-buffer-1' | 'story-buffer-2' | 'story-screen';

export const ChronosModeFlow: React.FC<ChronosModeFlowProps> = () => {
    const [stage, setStage] = useState<FlowStage>('mode-select');
    const [topic, setTopic] = useState('');

    const handleModeSelect = (mode: 'visualize' | 'story') => {
        if (mode === 'visualize') {
            setStage('visualize-input');
        } else {
            setStage('story-input');
        }
    };

    // Visualize flow handlers
    const handleVisualizeTopicSubmit = (userTopic: string) => {
        setTopic(userTopic);
        setStage('visualize-buffer-1');
    };

    const handleVisualizeBuffer1Complete = () => {
        setStage('visualize-buffer-2');
    };

    const handleVisualizeBuffer2Complete = () => {
        setStage('visualize-viewer');
    };

    // Story flow handlers
    const handleStoryTopicSubmit = (userTopic: string) => {
        setTopic(userTopic);
        setStage('story-buffer-1');
    };

    const handleStoryBuffer1Complete = () => {
        setStage('story-buffer-2');
    };

    const handleStoryBuffer2Complete = () => {
        setStage('story-screen');
    };

    const handleBackToModeSelect = () => {
        setStage('mode-select');
        setTopic('');
    };

    // Render based on current stage
    switch (stage) {
        case 'mode-select':
            return <ChronosModeSelector onSelectMode={handleModeSelect} />;

        // VISUALIZE FLOW
        case 'visualize-input':
            return <VisualizeTopicInput onSubmit={handleVisualizeTopicSubmit} />;

        case 'visualize-buffer-1':
            return (
                <StoryModeBuffer
                    duration={10}
                    message="Generating 360° visualization..."
                    onComplete={handleVisualizeBuffer1Complete}
                />
            );

        case 'visualize-buffer-2':
            return (
                <StoryModeBuffer
                    duration={5}
                    message="Loading panoramic view..."
                    onComplete={handleVisualizeBuffer2Complete}
                />
            );

        case 'visualize-viewer':
            return <PanoramaViewer topic={topic} onBack={handleBackToModeSelect} />;

        // STORY FLOW
        case 'story-input':
            return <StoryModeTopicInput onSubmit={handleStoryTopicSubmit} />;

        case 'story-buffer-1':
            return (
                <StoryModeBuffer
                    duration={10}
                    message="Preparing your story..."
                    onComplete={handleStoryBuffer1Complete}
                />
            );

        case 'story-buffer-2':
            return (
                <StoryModeBuffer
                    duration={5}
                    message="Almost ready..."
                    onComplete={handleStoryBuffer2Complete}
                />
            );

        case 'story-screen':
            return <StoryModeSplitScreen topic={topic} onBack={handleBackToModeSelect} />;

        default:
            return <ChronosModeSelector onSelectMode={handleModeSelect} />;
    }
};
