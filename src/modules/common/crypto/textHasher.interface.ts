export interface ITextHasher {
  hash(text: string): Promise<string>
  compare(text: string, hash: string): Promise<boolean>
}
