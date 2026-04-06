import React from "react";
import {
	LIFE_STAGE_COLORS,
	ACTIVITY_COLORS,
	ACTIVITY_EMOJIS,
	type LifeStage,
	type ActivityType,
} from "@/hooks/life-in-weeks/useLifeInWeeks";

const LIFE_STAGE_ITEMS: { stage: LifeStage; label: string }[] = [
	{ stage: "early-years", label: "Early Years" },
	{ stage: "education", label: "Education" },
	{ stage: "retirement", label: "Retirement" },
];

const BASE_ACTIVITY_ITEMS: { type: ActivityType; label: string }[] = [
	{ type: "sleep", label: "Sleeping" },
	{ type: "commute", label: "Commuting" },
	{ type: "admin", label: "Life Admin" },
];

const JOB_ITEM: { type: ActivityType; label: string } = { type: "job", label: "Working" };

const FREE_ITEM: { type: ActivityType; label: string } = { type: "free", label: "Truly Free" };

interface LegendProps {
	showPhases: boolean;
	showUsefulTime: boolean;
}

const Legend: React.FC<LegendProps> = ({ showPhases, showUsefulTime }) => {
	const activityItems = [
		...BASE_ACTIVITY_ITEMS,
		JOB_ITEM,
		FREE_ITEM,
	];

	return (
		<div className="flex flex-col gap-1 items-center text-[10px]">
			{showPhases && (
				<div className="flex items-center gap-3 justify-center">
					<span className="text-[8px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Phases</span>
					{LIFE_STAGE_ITEMS.map(({ stage, label }) => (
						<div key={stage} className="flex items-center gap-1">
							<div
								className="w-2 h-2 rounded-[1px] shrink-0"
								style={{ backgroundColor: LIFE_STAGE_COLORS[stage] }}
							/>
							<span className="text-foreground/60">{label}</span>
						</div>
					))}
				</div>
			)}

			{showUsefulTime && (
				<div className="flex items-center gap-3 justify-center">
					<span className="text-[8px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Time</span>
					{activityItems.map(({ type, label }) => (
						<div key={type} className="flex items-center gap-1">
							<div
								className="w-2 h-2 rounded-[1px] shrink-0"
								style={{ backgroundColor: ACTIVITY_COLORS[type] }}
							/>
							<span className="text-foreground/60">
								{ACTIVITY_EMOJIS[type]} {label}
							</span>
						</div>
					))}
				</div>
			)}

		</div>
	);
};

export default Legend;
