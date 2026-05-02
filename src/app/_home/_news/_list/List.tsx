"use client"

import { StoxyxService } from "@/src/services";
import { ListProps } from "./ListProps";
import { useImperativeHandle, useState } from "react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

export function List({
	ref,
	isLoading
}: ListProps) {
	const
		[news, setNews]
			= useState<StoxyxService.Api.V1.News.List.ResponseData[]>([])

	useImperativeHandle(ref, () => {
		return {
			setNewsList(data_) {
				setNews(data_)
			}
		}
	}, [
		setNews
	])

	if (isLoading) {
		return (
			<div className="flex w-full flex-col gap-3 max-h-85 overflow-y-auto">
				{[...Array(5)].map((_, i) => (
					<Item key={i} variant="outline">
						<ItemContent>
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-2/5 mt-1" />
						</ItemContent>
					</Item>
				))}
			</div>
		)
	}

	return (
		<div className="flex w-full flex-col gap-3 max-h-85 overflow-y-auto">
			{
				news.map((item, idx) => (
					<Item
						key={`news-${idx}`}
						variant="outline"
					>
						<a href={item.link}>
							<ItemContent>
								<ItemTitle>{item.title}</ItemTitle>
								<ItemDescription>
									{`${item.source.name}, ${item.publish_date}`}
								</ItemDescription>
							</ItemContent>
						</a>
					</Item>
				))
			}
		</div>
	)
}