export function assertRecordId(id: string): void {
  if (!id.trim()) {
    throw new Error('O identificador do registro não pode ficar vazio.');
  }
}
