import { FetchHelpers } from "@/src/helpers";
import { RequestData } from "./RequestData";
import { BaseResponse } from "@/src/services/stoxyx/types";
import { ResponseData } from "./ResponseData";

export async function fn(
	data: RequestData,
	options?: FetchHelpers.ConfigOptions
) {
	return await FetchHelpers.api.get<BaseResponse<ResponseData[]>>(
		`${process.env.NEXT_PUBLIC_STOXYX_API_BASE_URL}/api/v1/news/list?query=${data.query}`,
		options
	).then(res => {
		if (res) {
			return res
		}
		return null
	})
}