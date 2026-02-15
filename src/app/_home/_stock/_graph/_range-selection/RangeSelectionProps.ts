import { StoxyxService } from "@/src/services";

export interface RangeSelectionProps {
	onChangeRange: (range: StoxyxService.Api.V1.Stock.Chart.RangeType) => void
}