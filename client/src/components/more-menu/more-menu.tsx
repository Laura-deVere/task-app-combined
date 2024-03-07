import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { ellipsisVerticalOutline } from "ionicons/icons";

import "./more-menu.scss";

const className = "more-menu";
const classNamePrefix = `${className}__`;

interface MenuItem {
	name: string;
	onClick: () => void;
}

type MenuItemsArray = MenuItem[] | [];

const MoreMenu: React.FC<{ items: MenuItemsArray }> = ({ items }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={className}>
			<button
				className={`${classNamePrefix}btn-ctrl`}
				role='button'
				aria-haspopup='true'
				aria-expanded={isOpen}
				aria-controls='more-menu'
				type='button'
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<IonIcon color='light' icon={ellipsisVerticalOutline} />
			</button>
			<ul
				className={`${classNamePrefix}list ${
					isOpen ? `${classNamePrefix}list--open` : ""
				}`}
				id='more-menu'
				role='menu'
				aria-expanded={isOpen}
			>
				{items.map((item: MenuItem) => {
					const { name, onClick } = item;
					return (
						<li
							role='menuitem'
							className={`${classNamePrefix}list-item`}
							key={name}
						>
							<button type='button' onClick={onClick}>
								{name}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MoreMenu;
