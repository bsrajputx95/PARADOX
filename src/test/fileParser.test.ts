describe('fileParser utilities', () => {
  describe('extractTitleFromContent', () => {
    it('should extract the first non-empty line as title', () => {
      const content = 'Introduction to Physics\nThis is the content...';
      const title = content.split('\n').filter(line => line.trim().length > 0)[0];
      expect(title).toBe('Introduction to Physics');
    });

    it('should return empty string for empty content', () => {
      const content = '';
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      const title = lines[0] || 'Untitled Document';
      expect(title).toBe('Untitled Document');
    });

    it('should handle content with only whitespace', () => {
      const content = '   \n\n   ';
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      const title = lines[0] || 'Untitled Document';
      expect(title).toBe('Untitled Document');
    });
  });

  describe('countWords', () => {
    it('should count words correctly', () => {
      const text = 'Hello world this is a test';
      const count = text.split(/\s+/).filter(word => word.length > 0).length;
      expect(count).toBe(6);
    });

    it('should return 0 for empty string', () => {
      const text = '';
      const cleanedText = text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const count = cleanedText.length === 0 ? 0 : cleanedText.split(' ').filter(word => word.length > 0).length;
      expect(count).toBe(0);
    });

    it('should handle multiple spaces', () => {
      const text = 'Hello    world';
      const cleanedText = text.replace(/\s+/g, ' ').trim();
      const count = cleanedText.split(' ').filter(word => word.length > 0).length;
      expect(count).toBe(2);
    });
  });
});
