"use client"

import {
	ChartConfig, ChartContainer,
	//  ChartLegend, ChartLegendContent,
	ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { GraphProps } from "./GraphProps"
import { useCallback, useEffect, useImperativeHandle, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { RangeSelection } from "./_range-selection"

const chartConfig = {
	close: {
		label: "Close",
		color: "var(--chart-1)"
	},
} satisfies ChartConfig

export function Graph({
	ref,
	isLoading,
	rangeSelectionProps
}: GraphProps) {
	const
		[data, setData] =
			useState<{
				close: number,
				timestamp: number
			}[]>([]),
		[isUp, setIsUp] =
			useState<boolean>(false),
		setTrend
			= useCallback((
				diff: number
			) => {
				setIsUp(diff >= 0)
			}, [
				setIsUp
			])

	useImperativeHandle(ref, () => {
		return {
			setData(data_) {
				setData(data_.filter(item => item.close !== 0))
			},
		}
	}, [
		setData,
	])

	useEffect(() => {
		if (data.length) {
			const diff = data[data.length - 1].close - data[0].close
			setTrend(diff)
		}
	}, [
		setTrend,
		data
	])

	if (isLoading) {
		return (
			<>
				<RangeSelection {...rangeSelectionProps} />
				<div className="flex flex-col gap-3 h-62.5">
					<div className="flex items-end gap-1 flex-1">
						{[40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 50, 85, 65, 45, 70, 55, 80, 60, 75, 50].map(
							(h, i) => (
								<Skeleton key={i} className="flex-1 rounded-sm" style={{ height: `${h}%` }} />
							)
						)}
					</div>
					<div className="flex gap-4">
						{[...Array(5)].map((_, i) => (
							<Skeleton key={i} className="h-3 flex-1" />
						))}
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<RangeSelection
				{...rangeSelectionProps}
			/>
			<ChartContainer config={chartConfig}
				className="aspect-auto w-full h-62.5"
			>
				<AreaChart data={data}>
					<defs>
						<linearGradient id="fillClose" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor={isUp ? "#22c55e" : "#ef4444"}
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor={isUp ? "#22c55e" : "#ef4444"}
								stopOpacity={0.1}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="timestamp"
						tickLine={false}
						axisLine={false}
						// tickMargin={8}
						minTickGap={8}
						interval="preserveStartEnd"
						tickFormatter={(value) =>
							new Date(value * 1000).toLocaleDateString("en-US", {
								day: "numeric",
								month: "short",
								// year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})
						}
					/>
					<YAxis
						hide
						domain={[
							(min: number) => min * 0.995,
							(max: number) => max * 1.005
						]}
					/>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								labelFormatter={(_, payload) => {
									if (!payload.length) return null

									const ts = payload[0].payload.timestamp
									return new Date(ts * 1000).toLocaleString("en-US", {
										day: "numeric",
										month: "short",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})
								}}
								indicator="dot"
							/>
						}
					/>
					<Area
						dataKey="close"
						type="monotone"
						fill="url(#fillClose)"
						stroke={isUp ? "#22c55e" : "#ef4444"}
						strokeWidth={2}
						dot={false}
						activeDot={{ r: 4 }}
					/>
				</AreaChart>
			</ChartContainer>
		</>
	)
}