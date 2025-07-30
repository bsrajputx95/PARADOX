import { MockDataBundle, SceneData, QuestionData, AssetMapData, Section } from '@/types';

export class DeterministicGenerator {
  private seed: number;
  private content: string;

  constructor(seed: number, content: string = '') {
    this.seed = seed;
    this.content = content;
  }

  private nextRandom(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  generateFromContent(content: string): MockDataBundle {
    this.content = content;
    const hash = this.hashCode(content);
    this.seed = hash;

    return this.generateMockData();
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private generateMockData(): MockDataBundle {
    const title = this.extractTitle(this.content);
    const sections = this.generateSections(this.content);
    const scenes = this.generateScenes(sections);
    const questions = this.generateQuestions(scenes);

    return {
      title,
      content: this.content,
      outline: { title, sections },
      scenes,
      questions,
      assetMap: this.generateAssetMap(scenes)
    };
  }

  private extractTitle(content: string): string {
    if (!content) return 'Untitled Learning Journey';

    const lines = content.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return 'Untitled Learning Journey';

    const firstLine = lines[0].trim();
    return firstLine.length > 100 ? firstLine.slice(0, 100) : firstLine;
  }

  private generateSections(content: string): Section[] {
    const wordCount = this.countWords(content);
    const sectionCount = Math.min(Math.max(Math.floor(wordCount / 150), 2), 6);

    const sectionTemplates = [
      'Foundations & Core Principles',
      'Historical Context & Evolution',
      'Key Concepts & Definitions',
      'Practical Applications',
      'Advanced Techniques',
      'Summary & Key Takeaways'
    ];

    return Array.from({ length: sectionCount }, (_, i) => ({
      id: `sec_${this.hashCode(content + i.toString())}`,
      heading: sectionTemplates[i] || `Section ${i + 1}`,
      bullets: this.generateBullets(content, i, sectionCount)
    }));
  }

  private generateBullets(_content: string, sectionIndex: number, _totalSections: number): string[] {
    const bulletTemplates = [
      'Understanding fundamental principles through examples',
      'Analyzing real-world applications and use cases',
      'Exploring key terminology and definitions',
      'Practice exercises with step-by-step solutions',
      'Common pitfalls and how to avoid them'
    ];

    const bulletCount = Math.floor(this.nextRandom() * 2) + 3;

    return Array.from({ length: bulletCount }, (_, i) => {
      const templateIndex = (sectionIndex + i) % bulletTemplates.length;
      const bullet = bulletTemplates[templateIndex];

      if (this.nextRandom() > 0.7) {
        return this.customizeBullet(bullet, sectionIndex);
      }

      return bullet;
    });
  }

  private customizeBullet(baseBullet: string, sectionIndex: number): string {
    const prefixes = [
      'Deep dive into ',
      'Introduction to ',
      'Advanced ',
      'Mastering ',
      'Exploring '
    ];

    if (sectionIndex === 0) {
      return `Introduction: ${baseBullet}`;
    } else if (sectionIndex === 1) {
      return `Historical perspective: ${baseBullet}`;
    }

    return prefixes[sectionIndex % prefixes.length] + baseBullet.toLowerCase();
  }

  private countWords(text: string): number {
    if (!text) return 0;
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  private generateScenes(sections: Section[]): SceneData[] {
    const scenes: SceneData[] = [];
    let currentTime = 0;

    sections.forEach((section, sectionIndex) => {
      const sceneCount = Math.floor(this.nextRandom() * 2) + 2;

      Array.from({ length: sceneCount }, (_, sceneIndex) => {
        const duration = Math.floor(this.nextRandom() * 45) + 20;
        const sceneId = `scene_${sectionIndex}_${sceneIndex}_${this.hashCode(section.id + sceneIndex)}`;

        scenes.push({
          id: sceneId,
          start: currentTime,
          duration: duration,
          text: this.generateSceneText(section, sceneIndex)
        });

        currentTime += duration;
      });
    });

    return scenes;
  }

  private generateSceneText(section: Section, sceneIndex: number): string {
    const sceneTemplates = [
      `Opening: ${section.heading} - Setting the context`,
      `Development: Key concepts of ${section.heading}`,
      `Deep dive: ${section.bullets[sceneIndex % section.bullets.length]}`,
      `Conclusion: Summary of ${section.heading}`
    ];

    return sceneTemplates[sceneIndex % sceneTemplates.length];
  }

  private generateQuestions(scenes: SceneData[]): QuestionData[] {
    const questions: QuestionData[] = [];

    scenes.forEach((scene, index) => {
      if (this.nextRandom() > 0.4) {
        const questionTime = scene.start + Math.floor(scene.duration * 0.6);

        questions.push({
          scene_id: scene.id,
          time: questionTime,
          text: this.generateQuestionText(scene, index),
          options: this.generateQuestionOptions(scene, index),
          answer_index: 0
        });
      }
    });

    return questions;
  }

  private generateQuestionText(scene: SceneData, _sceneIndex: number): string {
    const questionTemplates = [
      `What is the main principle discussed in "${scene.text.split(':')[1]?.trim() || 'this scene'}"?`,
      `Which of the following best describes the concept covered in this scene?`,
      `Based on the content, which statement is correct?`,
      `What key takeaway can you extract from this section?`
    ];

    return questionTemplates[this.hashCode(scene.id) % questionTemplates.length];
  }

  private generateQuestionOptions(scene: SceneData, _sceneIndex: number): string[] {
    const baseOption = scene.text.split(':')[1]?.trim() || 'the main concept';

    return [
      `Correct: Understanding ${baseOption}`,
      `Incorrect: Misunderstanding ${baseOption}`,
      `Partially correct: Partial understanding of ${baseOption}`,
      `Not covered: Something unrelated to ${baseOption}`
    ];
  }

  private generateAssetMap(scenes: SceneData[]): AssetMapData {
    const sceneToClip: Record<string, string> = {};

    scenes.forEach(scene => {
      const clipId = this.hashCode(scene.id) % 100;
      sceneToClip[scene.id] = `/r/preview_${clipId}.mp4`;
    });

    return {
      mode: 'Cinema',
      scene_to_clip: sceneToClip
    };
  }
}

export class MockEngine {
  generateMockData(content: string, mode: string = 'cinema'): MockDataBundle {
    const hash = this.hashCode(content);
    const generator = new DeterministicGenerator(hash, content);
    const data = generator.generateFromContent(content);

    data.assetMap.mode = mode as 'Cinema' | 'Hologram' | 'Chronos';

    return data;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

export const mockEngine = new MockEngine();
