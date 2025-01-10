import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface ColorPickerProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	name: Path<T>;
	id: string;
	label?: string;
	containerClass?: string;
}

const ColorPicker = <T extends FieldValues>({
	id,
	name,
	label,
	containerClass,
	register,
}: ColorPickerProps<T>) => {
	return (
		<div className={containerClass}>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<input
				type="color"
				id={id}
				className="block h-9 w-9 hover:cursor-pointer"
				{...register(name, {
					required: true,
				})}
			/>
		</div>
	);
};
export default ColorPicker;
