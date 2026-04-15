
export interface Product {
  id: string;
  name: string;
  category: string;
  isBestSeller?: boolean;
}

export interface IANode {
  label: string;
  description?: string;
  children?: IANode[];
}

export interface Insight {
  title: string;
  description: string;
  type: 'actionable' | 'observation';
}
