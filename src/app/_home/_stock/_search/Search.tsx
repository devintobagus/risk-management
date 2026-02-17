"use client"

import { useQuery } from "@tanstack/react-query";
import { SearchProps } from "./SearchProps";
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StoxyxService } from "@/src/services";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export function Search({
	onChangeStockData,
	ref
}: SearchProps) {
	const
		[stock, setStock] =
			useState<string>(""),
		[range, setRange] =
			useState<StoxyxService.Api.V1.Stock.Chart.RangeType>("1d"),
		searchStockRef
			= useRef<HTMLInputElement>(null),
		{ data } =
			useQuery({
				queryKey: ["stock", stock, range],
				queryFn({ signal }) {
					return StoxyxService.Api.V1.Stock.Chart.fn({
						range: range,
						stock: stock,
					}, {
						signal
					}).then(res => {
						return res?.data ?? null
					})
				},
				staleTime: 10 * 1000 * 60,
				enabled: !!stock && !!range
			}),
		onFetchStockData: NonNullable<React.ComponentProps<"button">["onClick"]> = useCallback(() => {
			if (searchStockRef.current?.value) {
				setStock(searchStockRef.current.value.toUpperCase())
			}
		}, [
			setStock
		])

	useImperativeHandle(ref, () => {
		return {
			onChangeStockRange(range_) {
				setRange(range_)
			},
		}
	}, [
		setRange
	])

	useEffect(() => {
		if (data?.length) {
			onChangeStockData(data, stock)
		}
	}, [
		onChangeStockData,
		data,
		stock
	])

	return (
		<InputGroup>
			<InputGroupInput required ref={searchStockRef} placeholder="Search IDX stocks (e.g. BBCA, TLKM)" />
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					className="cursor-pointer"
					variant="secondary"
					onClick={onFetchStockData}
				>Search</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	)
}