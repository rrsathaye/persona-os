export type CommunicationDimension = {
  id: string;
  leftLabel: string;
  rightLabel: string;
  balance: number; // 0 = 100% left, 100 = 100% right
};

export type CommunicationStyle = {
  dimensions: CommunicationDimension[];
};