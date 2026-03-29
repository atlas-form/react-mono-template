import {
  Slider as CoreSlider,
  type SliderProps as CoreSliderProps,
} from "@workspace/ui-core/components/slider"

export type SliderProps = CoreSliderProps

export function Slider(props: SliderProps) {
  return <CoreSlider {...props} />
}
