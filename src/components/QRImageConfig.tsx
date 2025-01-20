import ColorPicker from "./ColorPicker";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "flowbite-react/components/Label";
import { RangeSlider } from "flowbite-react/components/RangeSlider";

interface QRImageConfigProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	quietZone: number;
	dots: number;
}

const QRImageConfig = <T extends FieldValues>({
	register,
	quietZone,
	dots,
}: QRImageConfigProps<T>) => {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<h5 className="mb-2 font-medium">Colorful</h5>
				<div className="flex justify-start gap-3">
					<ColorPicker
						id="colorDark"
						name={"colorDark" as Path<T>}
						register={register}
						label="Foreground Color"
					/>

					<ColorPicker
						id="colorLight"
						name={"colorLight" as Path<T>}
						register={register}
						label="Background Color"
					/>
				</div>
			</div>
			<div>
				<h5 className="mb-2 font-medium">Quiet Zone</h5>

				<div className="flex items-center justify-between gap-3 ">
					<ColorPicker
						id="quietZoneColor"
						name={"quietZoneColor" as Path<T>}
						register={register}
						label="Quiet Zone Color"
					/>

					<div className="flex-1">
						<div className="block mb-1">
							<Label htmlFor="quiet-zone" value="Quiet Zone" />
						</div>
						<RangeSlider
							id="quiet-zone"
							itemID={"quietZone"}
							min={0}
							max={1000}
							{...register("quietZone" as Path<T>, {
								required: false,
								valueAsNumber: true,
							})}
						/>
						{quietZone}
					</div>
				</div>
			</div>

			<div>
				<h5 className="mb-2 font-medium">Dots</h5>

				<div className="flex items-center justify-between gap-3 ">
					<div className="flex-1">
						<RangeSlider
							id="dots"
							itemID={"dots"}
							{...register("dots" as Path<T>, {
								required: false,
								valueAsNumber: true,
							})}
							min={0.1}
							max={1.0}
							step={0.1}
						/>
						{dots}
					</div>
				</div>
			</div>
		</div>
	);
};

export default QRImageConfig;
