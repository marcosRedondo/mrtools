export interface Language {
  files: File[];
  codes: string[];
  keys: Map<string, Map<string, string>>;
  modify: boolean;
}
