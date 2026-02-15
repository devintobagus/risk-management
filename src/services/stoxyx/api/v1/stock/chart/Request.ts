export interface Request {
	stock: string
	range: RangeType
}

export type RangeType =
	"1d" |
	"5d" |
	"1mo" |
	"3mo" |
	"1y" |
	"5y"