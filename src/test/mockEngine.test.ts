import { describe, it, expect } from 'vitest';
import { DeterministicGenerator, MockEngine, mockEngine } from '../utils/mockEngine';

describe('MockEngine', () => {
  describe('DeterministicGenerator', () => {
    it('should generate consistent results for same seed', () => {
      const content = 'Introduction to Physics\n\nThis is a test document.';
      const generator1 = new DeterministicGenerator(12345, content);
      const generator2 = new DeterministicGenerator(12345, content);

      const result1 = generator1.generateFromContent(content);
      const result2 = generator2.generateFromContent(content);

      expect(result1.title).toBe(result2.title);
      expect(result1.scenes.length).toBe(result2.scenes.length);
      expect(result1.questions.length).toBe(result2.questions.length);
    });

    it('should generate different results for different seeds', () => {
      const content = 'Introduction to Physics\n\nThis is a test document.';
      const generator1 = new DeterministicGenerator(12345, content);
      const generator2 = new DeterministicGenerator(67890, content);

      const result1 = generator1.generateFromContent(content);
      const result2 = generator2.generateFromContent(content);

      expect(result1.scenes.length).not.toBe(result2.scenes.length);
    });

    it('should extract title from first line', () => {
      const content = 'My Document Title\n\nSome content here.';
      const generator = new DeterministicGenerator(12345, content);
      const result = generator.generateFromContent(content);

      expect(result.title).toBe('My Document Title');
    });

    it('should handle empty content', () => {
      const generator = new DeterministicGenerator(12345, '');
      const result = generator.generateFromContent('');

      expect(result.title).toBe('Untitled Learning Journey');
      expect(result.scenes.length).toBeGreaterThan(0);
    });

    it('should generate valid mock data structure', () => {
      const content = 'Introduction to Physics\n\nThis is a test document with enough content to generate scenes.';
      const generator = new DeterministicGenerator(12345, content);
      const result = generator.generateFromContent(content);

      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('outline');
      expect(result).toHaveProperty('scenes');
      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('assetMap');

      expect(result.outline).toHaveProperty('title');
      expect(result.outline).toHaveProperty('sections');
      expect(Array.isArray(result.outline.sections)).toBe(true);

      result.scenes.forEach(scene => {
        expect(scene).toHaveProperty('id');
        expect(scene).toHaveProperty('start');
        expect(scene).toHaveProperty('duration');
        expect(scene).toHaveProperty('text');
      });

      result.questions.forEach(question => {
        expect(question).toHaveProperty('scene_id');
        expect(question).toHaveProperty('time');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('answer_index');
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBe(4);
      });
    });

    it('should generate sections based on content length', () => {
      const shortContent = 'Short doc';
      const longContent = Array(20).fill('This is a test sentence with enough words to create multiple sections. ').join('');

      const shortGen = new DeterministicGenerator(12345, shortContent);
      const longGen = new DeterministicGenerator(12345, longContent);

      const shortResult = shortGen.generateFromContent(shortContent);
      const longResult = longGen.generateFromContent(longContent);

      expect(shortResult.outline.sections.length).toBeLessThanOrEqual(longResult.outline.sections.length);
    });
  });

  describe('MockEngine', () => {
    it('should export a singleton instance', () => {
      expect(mockEngine).toBeInstanceOf(MockEngine);
    });

    it('should generate mock data from content', () => {
      const content = 'Introduction to Chemistry\n\nChemical reactions and equations.';
      const result = mockEngine.generateMockData(content);

      expect(result).toBeDefined();
      expect(result.title).toBe('Introduction to Chemistry');
      expect(result.scenes.length).toBeGreaterThan(0);
    });

    it('should accept mode parameter', () => {
      const content = 'Test content with enough words to generate multiple scenes and sections.';
      const result = mockEngine.generateMockData(content, 'hologram');

      expect(result.assetMap.mode).toBe('Hologram');
    });

    it('should generate asset map with scene references', () => {
      const content = 'Test content for asset mapping with sufficient length.';
      const result = mockEngine.generateMockData(content, 'cinema');

      expect(result.assetMap.scene_to_clip).toBeDefined();
      expect(typeof result.assetMap.scene_to_clip).toBe('object');

      result.scenes.forEach(scene => {
        expect(result.assetMap.scene_to_clip[scene.id]).toBeDefined();
      });
    });

    it('should generate questions for scenes when random condition is met', () => {
      const content = 'Content that will generate scenes with potential questions. ' +
        'This needs to be long enough to generate multiple scenes. '.repeat(10);

      const result = mockEngine.generateMockData(content);

      result.questions.forEach(question => {
        const scene = result.scenes.find(s => s.id === question.scene_id);
        expect(scene).toBeDefined();
        expect(question.time).toBeGreaterThanOrEqual(scene!.start);
        expect(question.time).toBeLessThan(scene!.start + scene!.duration);
      });
    });
  });
});
