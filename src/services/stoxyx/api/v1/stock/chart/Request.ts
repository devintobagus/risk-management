export interface Request {
	stock: string
	range: RangeType
}

export type RangeType =
	"1d" |
	"5d" |
	"1mo" |
	"1y"