import { StoxyxService } from "@/src/services";

export interface ListRef {
	setNewsList: (data: StoxyxService.Api.V1.News.List.ResponseData[]) => void
}