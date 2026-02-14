import { FetchHelpers } from "@/src/helpers";
import { Request } from "./Request";
import { BaseResponse } from "@/src/services/stoxyx/types";
import { ResponseData } from "./ResponseData";

export async function fn(
	data: Request,
	options?: FetchHelpers.ConfigOptions
) {
	return await FetchHelpers.api.post<BaseResponse<ResponseData[]>>(
		`${process.env.NEXT_PUBLIC_STOXYX_API_BASE_URL}/api/v1/stock/chart`,
		JSON.stringify(data),
		options
	).then(res => {
		if (res) {
			return res
		}
		return null
	})
}