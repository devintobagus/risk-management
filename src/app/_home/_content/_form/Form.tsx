"use client"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { ComponentProps, useCallback, useRef } from "react"
import { FormProps } from "./FormProps"
import { Button } from "@/components/ui/button"

export function Form({
	onAfterSubmit,
}: FormProps) {
	const
		balanceRef
			= useRef<HTMLInputElement>(null),
		riskRef
			= useRef<HTMLInputElement>(null),
		entryRef
			= useRef<HTMLInputElement>(null),
		stopLossRef
			= useRef<HTMLInputElement>(null),

		onSubmit: NonNullable<ComponentProps<"form">["onSubmit"]>
			= useCallback(event => {
				event.preventDefault()
				if (
					balanceRef.current?.value &&
					riskRef.current?.value &&
					entryRef.current?.value &&
					stopLossRef.current?.value
				) {
					const
						stopLossPrice =
							(1 - Number(stopLossRef.current.value) * 1 / 100) * Number(entryRef.current.value),
						size_ =
							Math.floor(
								(Number(balanceRef.current.value) * Number(riskRef.current.value) * 1 / 100) /
								(100 * (Number(entryRef.current.value) - stopLossPrice))
							)
					onAfterSubmit(size_)
				}
			}, [
				onAfterSubmit,
			])


	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col gap-6"
		>
			<FormInputBox
				field="balance"
				inputProps={{
					required: true,
					ref: balanceRef,
					type: "number"
				}}
				title="Balance"
				leading="IDR"
			/>
			<FormInputBox
				field="risk"
				inputProps={{
					required: true,
					ref: riskRef,
					type: "number",
					max: 100
				}}
				title="Risk"
				trailing="%"
			/>
			<FormInputBox
				field="entry"
				inputProps={{
					required: true,
					ref: entryRef,
					type: "number",
				}}
				title="Entry Price"
				trailing="IDR / Stock"
			/>
			<FormInputBox
				field="stop-loss"
				inputProps={{
					required: true,
					ref: stopLossRef,
					type: "number"
				}}
				title="Stop Loss"
				trailing="%"
			/>
			<Button
				type="submit"
				className="cursor-pointer"
			>
				Calculate
			</Button>
		</form>
	)
}

interface FormInputBoxProps {
	field: string
	title: string
	inputProps: Omit<React.ComponentProps<"input">, "id">
	leading?: string | React.ReactNode
	trailing?: string | React.ReactNode
	hint?: string
}

function FormInputBox({
	field,
	inputProps,
	title,
	leading,
	trailing,
	hint,
}: FormInputBoxProps) {
	return (
		<Field className="gap-2">
			<FieldLabel htmlFor={field}>{title}</FieldLabel>
			<InputGroup>
				{
					leading && (
						<InputGroupAddon align="inline-start">
							{leading}
						</InputGroupAddon>
					)
				}
				<InputGroupInput
					id={field}
					min={inputProps.min ?? 0}
					{...inputProps}
				/>
				{
					trailing && (
						<InputGroupAddon align="inline-end">
							{trailing}
						</InputGroupAddon>
					)
				}
			</InputGroup>
			{
				hint && (
					<FieldDescription>{hint}</FieldDescription>
				)
			}
		</Field>
	)
}