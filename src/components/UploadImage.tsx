import { Label } from "flowbite-react/components/Label";
import { FileInput } from "flowbite-react/components/FileInput";
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface UploadImageProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	label: string;
	id: Path<T>;
	errors: FieldErrors;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	containerClass?: string;
	setValue: UseFormSetValue<T>;
}

const UploadImage = <T extends FieldValues>({
	errors,
	id,
	label,
	register,
	containerClass,
	inputProps,
}: UploadImageProps<T>) => {
	// console.log({ errors });

	return (
		<div className={twMerge(containerClass)}>
			<div className="block mb-2">
				<Label htmlFor="file-upload" value={label} />
			</div>
			<FileInput
				id={id}
				helperText="SVG, PNG, JPG or GIF (MAX. 400x400px)."
				accept=".svg, .png, .jpg, .jpeg, .gif"
				multiple={false}
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

export default UploadImage;
