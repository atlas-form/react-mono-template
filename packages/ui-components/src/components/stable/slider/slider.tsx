import {
  Slider as HeadlessSlider,
  type SliderProps as HeadlessSliderProps,
} from "@workspace/ui-core/components/slider"

export type SliderProps = HeadlessSliderProps

export function Slider(props: SliderProps) {
  return <HeadlessSlider {...props} />
}
