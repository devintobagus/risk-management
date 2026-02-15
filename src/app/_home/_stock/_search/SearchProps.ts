import { SearchRef } from "./SearchRef"

export interface SearchProps {
	onChangeStockData: (data: {
		close: number,
		timestamp: number
	}[], stockName: string) => void
	ref: React.Ref<SearchRef>
}