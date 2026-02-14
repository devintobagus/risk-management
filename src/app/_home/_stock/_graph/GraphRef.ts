export interface GraphRef {
	setData: (data: {
		close: number
		timestamp: number
	}[]) => void
}