import React from "react";
import {
	FieldValues,
	Path,
	UseFormRegister,
	FieldErrors,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	label: string;
	id: Path<T>;
	errors: FieldErrors;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	containerClass?: React.HTMLAttributes<HTMLDivElement>;
	type?: React.HTMLInputTypeAttribute;
}

const Input = <T extends FieldValues>({
	label,
	id,
	register,
	errors,
	type = "text",
	containerClass,
	inputProps,
}: InputProps<T>) => {
	return (
		<div {...containerClass}>
			<label
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				type={type}
				id={id}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 invalid:border-red-500 invalid:focus:ring-red-500"
				{...register(id, {
					required: true,
				})}
				{...inputProps}
			/>
			{errors[id] && (
				<span className="text-sm text-red-500 ps-2">
					{String(errors[id].message)}
				</span>
			)}
		</div>
	);
};

export default Input;
