"use client"

import { useImperativeHandle, useState } from "react"
import { FooterProps } from "./FooterProps"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Field, FieldLabel } from "@/components/ui/field"

export function Footer({
	ref
}: FooterProps) {
	const
		[size, setSize]
			= useState<number | null>(null)

	useImperativeHandle(ref, () => {
		return {
			setSize
		}
	}, [
		setSize
	])

	if (!size) {
		return null
	}

	return (
		<Field className="gap-2">
			<FieldLabel htmlFor="size-result">Size</FieldLabel>
			<InputGroup>
				<InputGroupInput
					id="size-result"
					disabled
					value={size}
				/>
				<InputGroupAddon align="inline-end">Lot</InputGroupAddon>
			</InputGroup>
		</Field>
	)
}