import { StoxyxService } from "@/src/services";

export interface SearchRef {
	onChangeStockRange: (range: StoxyxService.Api.V1.Stock.Chart.RangeType) => void
}