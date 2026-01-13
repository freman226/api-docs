
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  location: 'query' | 'path' | 'header' | 'body';
}

export interface ApiResponse {
  status: number;
  description: string;
  schema: string; // JSON string
}

export interface Endpoint {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
  description: string;
  parameters: Parameter[];
  responses: ApiResponse[];
  category: string;
}

export interface ApiDoc {
  title: string;
  version: string;
  description: string;
  baseUrl: string;
  categories: {
    name: string;
    endpoints: Endpoint[];
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
