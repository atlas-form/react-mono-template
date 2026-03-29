export type SemanticAliasCandidates<TSemantic extends string> = Partial<
  Record<TSemantic, string | readonly string[]>
>

export function buildResolvedSemanticMap<TSemantic extends string>({
  aliases,
  isAvailable,
  normalize,
}: {
  aliases: SemanticAliasCandidates<TSemantic>
  isAvailable: (name: string) => boolean
  normalize: (name: string) => string
}) {
  const resolved: Partial<Record<TSemantic, string>> = {}

  for (const [semanticName, candidateValue] of Object.entries(aliases) as Array<
    [TSemantic, string | readonly string[] | undefined]
  >) {
    if (!candidateValue) {
      continue
    }

    const candidates = Array.isArray(candidateValue)
      ? candidateValue
      : [candidateValue]

    for (const candidate of candidates) {
      const normalized = normalize(candidate)
      if (normalized && isAvailable(normalized)) {
        resolved[semanticName] = normalized
        break
      }
    }
  }

  return resolved
}
