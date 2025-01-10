import { Fragment } from "react";
import ColorPicker from "./ColorPicker";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "flowbite-react/components/Label";
import { RangeSlider } from "flowbite-react/components/RangeSlider";

interface QRImageConfigProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	quietZone: number;
}

const QRImageConfig = <T extends FieldValues>({
	register,
	quietZone,
}: QRImageConfigProps<T>) => {
	return (
		<Fragment>
			<div>
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

				<ColorPicker
					id="quietZoneColor"
					name={"quietZoneColor" as Path<T>}
					register={register}
					label="Quiet Zone Color"
				/>
			</div>
			<div className="mt-2">
				<div className="block mb-1">
					<Label htmlFor="quiet-zone" value="Quiet Zone" />
				</div>
				<RangeSlider
					id="quiet-zone"
					itemID={"quietZone"}
					{...register("quietZone" as Path<T>, {
						required: false,
						valueAsNumber: true,
					})}
				/>
				{quietZone}
			</div>
		</Fragment>
	);
};

export default QRImageConfig;
