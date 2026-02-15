"use client"

import { useImperativeHandle, useState } from "react";
import { HeaderProps } from "./HeaderProps";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Header({
	ref
}: HeaderProps) {
	const
		[stockName, setStockName]
			= useState<string | null>(null)

	useImperativeHandle(ref, () => {
		return {
			setStockName(stock_) {
				setStockName(stock_)
			},
		}
	})

	return (
		<CardHeader>
			<CardTitle>{stockName || "Check your market here"}</CardTitle>
			<CardDescription> Powered by Yahoo Finance — for educational purposes only (Indonesian equities only).</CardDescription>
		</CardHeader>
	)
}