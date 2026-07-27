export type LearningInsight = {
  id: string;
  title: string;
  description: string;
};

export type LearningResponse = {
  insights: LearningInsight[];
};