import ImageOverlay from "./ImageOverlay";

const PLACEHOLDER_IMAGE = "./src/assets/qr-code.png";

interface QRImageProps {
	isLoading: boolean;
	imgSrc: string | undefined;
}
const QRImage = ({ imgSrc, isLoading }: QRImageProps) => {
	return (
		<div className="relative w-full">
			<ImageOverlay isLoading={isLoading} />
			<img
				className="w-full aspect-square"
				src={imgSrc || PLACEHOLDER_IMAGE}
				alt="Qr code image"
			/>
		</div>
	);
};

export default QRImage;
