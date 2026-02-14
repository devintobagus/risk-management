
export interface SearchProps {
	onChangeStockData: (data: {
		close: number,
		timestamp: number
	}[], stockName: string) => void
}