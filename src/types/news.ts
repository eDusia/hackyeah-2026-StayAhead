export type NewsCategory = 'all' | 'ai_trends' | 'market' | 'best_practices' | 'tools';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: Exclude<NewsCategory, 'all'>;
  readTime: string;
  publishedAt: string;
  source: string;
  keyTakeaway: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface VoiceBriefSnippet {
  id: string;
  articleId?: string;
  topicLabel: string;
  title: string;
  speechText: string;
  keyTakeaway: string;
  estimatedSec: number;
}

export interface VoiceBriefing {
  id: string;
  title: string;
  subtitle: string;
  totalDurationText: string;
  introSpeech: string;
  outroSpeech: string;
  snippets: VoiceBriefSnippet[];
}
