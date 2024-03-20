import { useDragLayer } from "react-dnd";
// import { ItemTypes } from "./ItemTypes";
// import { Box } from "./Box";

// function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
// 	if (!initialOffset || !currentOffset) {
// 		return {
// 			display: "none",
// 		};
// 	}
// 	let { x, y } = currentOffset;
// 	const transform = `translate(${x}px, ${y}px)`;
// 	return {
// 		transform,
// 		WebkitTransform: transform,
// 	};
// }

export const CustomDragLayer = () => {
	const { itemType, isDragging } = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}));
	function renderItem() {
		console.log(itemType);
		switch (itemType) {
			case "project":
				return (
					<div
						style={{
							width: "100px",
							height: "100px",
							backgroundColor: "hotpink",
						}}
					>
						<span
							style={{
								width: "50px",
								height: "50px",
								backgroundColor: "black",
							}}
						>
							HEllo
						</span>
					</div>
				);
			default:
				return null;
		}
	}
	if (!isDragging) {
		return null;
	}
	return <div>{renderItem()}</div>;
};

export default CustomDragLayer;
