export interface BaseResponse<Data = unknown> {
	timestamp: string
	status: number
	message: string
	data: Data
}