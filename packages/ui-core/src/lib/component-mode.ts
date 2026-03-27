export type BaseMode = "styled" | "headless"

export const DEFAULT_MODE: BaseMode = "styled"

export type WithBaseMode = {
  mode?: BaseMode
}
