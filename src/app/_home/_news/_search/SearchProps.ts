import { StoxyxService } from "@/src/services";

export interface SearchProps {
	onChangeNewsData: (data: StoxyxService.Api.V1.News.List.ResponseData[], stock: string) => void
	onLoadingChange: (loading: boolean) => void
}