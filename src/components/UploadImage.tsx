import { Label } from "flowbite-react/components/Label";
import { FileInput } from "flowbite-react/components/FileInput";
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FileUploadProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	label: string;
	id: Path<T>;
	errors: FieldErrors;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	containerClass?: string;
	helperText: string;
}

const FileUpload = <T extends FieldValues>({
	errors,
	id,
	label,
	helperText,
	containerClass,
	inputProps,
	register,
}: FileUploadProps<T>) => {
	return (
		<div className={twMerge(containerClass)}>
			<div className="block mb-2">
				<Label htmlFor={id} value={label} />
			</div>
			<FileInput
				id={id}
				helperText={helperText}
				{...register(id)}
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

export default FileUpload;
