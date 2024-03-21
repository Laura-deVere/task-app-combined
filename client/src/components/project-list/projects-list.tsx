import { useCallback, useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
	DndContext,
	closestCenter,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ProjectCard from "../project-card/project-card";
import { Project } from "../../types";
import { ProjectsContext } from "../../context/projects-context";

import "./projects-list.scss";

const className = "projects-list";

const ProjectsList: React.FC = () => {
	const gridRef = useRef(null);

	const [activeId, setActiveId] = useState<Project | null>(null);
	const { projects, setProjects } = useContext(ProjectsContext);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	useEffect(() => {
		const grid = gridRef.current;
		if (grid) adjustGridItemsHeight(grid);
	});

	const handleDragEnd = useCallback(
		(event) => {
			const { active, over } = event;
			console.log(active.id, over.id);

			if (active.id !== over.id) {
				const oldIndex = projects.findIndex(
					(project: Project) => project._id === active.id
				);
				const newIndex = projects.findIndex(
					(project: Project) => project._id === over.id
				);
				const moveProject = arrayMove(projects, oldIndex, newIndex);
				setProjects(moveProject);
			}

			setActiveId(null);
		},
		[projects]
	);

	function handleDragStart(event) {
		const { active } = event;

		setActiveId(projects.find((project: Project) => project._id === active.id));
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
		>
			<SortableContext items={projects} strategy={verticalListSortingStrategy}>
				<ul className={className} ref={gridRef}>
					{projects.map((project: Project, index: number) => {
						const { _id, name, tasks } = project;
						return (
							<ProjectCard
								key={_id}
								project={project}
								name={name}
								tasks={tasks}
								index={index}
								_id={_id}
							/>
						);
					})}
				</ul>
			</SortableContext>
			<DragOverlay>
				{activeId ? (
					<ProjectCard
						key={activeId._id}
						project={activeId}
						name={activeId.name}
						tasks={activeId.tasks}
						index={-1}
						_id={activeId._id}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

const adjustGridItemsHeight = (grid: HTMLElement) => {
	// console.log(grid);
	const items = grid.children;

	for (let i = 0; i < items.length; i++) {
		// let item = items[i];
		let item = ReactDOM.findDOMNode(items[i])! as HTMLElement;

		let rowHeight = parseInt(
			window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
		);
		let rowGap = parseInt(
			window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
		);
		let itemChild = item!.firstChild as HTMLElement;
		let rowSpan = Math.ceil(
			(itemChild!.getBoundingClientRect().height + rowGap) /
				(rowHeight + rowGap)
		);
		item.style.gridRowEnd = "span " + rowSpan;
	}
};

export default ProjectsList;
