import { RangeSelectionProps } from "./_range-selection";
import { GraphRef } from "./GraphRef";

export interface GraphProps {
	ref: React.Ref<GraphRef>
	isLoading: boolean
	rangeSelectionProps: RangeSelectionProps
}