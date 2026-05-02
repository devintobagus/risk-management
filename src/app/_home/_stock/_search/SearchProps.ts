import { SearchRef } from "./SearchRef"

export interface SearchProps {
	onChangeStockData: (data: {
		close: number,
		timestamp: number
	}[], stockName: string) => void
	onLoadingChange: (loading: boolean) => void
	ref: React.Ref<SearchRef>
}