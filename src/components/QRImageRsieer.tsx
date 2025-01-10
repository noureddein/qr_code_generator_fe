import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface QRImageResizerProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	size: number;
}

const QRImageResizer = <T extends FieldValues>({
	register,
	size,
}: QRImageResizerProps<T>) => {
	return (
		<div className="relative mb-10">
			<input
				type="range"
				min="200"
				max="2000"
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
				{...register("size" as Path<T>, {
					required: true,
					valueAsNumber: true,
				})}
			/>

			<span className="absolute text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">
				Low Quality
			</span>
			<span className="absolute text-sm font-medium text-gray-500 -translate-x-1/2 start-1/2 dark:text-gray-400 -bottom-6">
				{`${size} x ${size} px`}
			</span>
			<span className="absolute text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">
				High Quality
			</span>
		</div>
	);
};

export default QRImageResizer;
