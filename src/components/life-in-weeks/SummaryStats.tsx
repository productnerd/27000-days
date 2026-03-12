import React from "react";
import {
	type ActivityBreakdown,
	ACTIVITY_EMOJIS,
	ACTIVITY_COLORS,
} from "@/hooks/life-in-weeks/useLifeInWeeks";

interface SummaryStatsProps {
	remainingWeeks: number;
	activityBreakdown: ActivityBreakdown;
	freeRemainingDays: number;
	freeRemainingHours: number;
	totalFreeHoursWithRetirement: number;
	remainingYears: number;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
	remainingWeeks,
	activityBreakdown,
	freeRemainingDays,
	freeRemainingHours,
	totalFreeHoursWithRetirement,
	remainingYears,
}) => {
	const activities = [
		{
			emoji: ACTIVITY_EMOJIS.sleep,
			label: "Sleeping",
			weeks: activityBreakdown.sleep,
			color: ACTIVITY_COLORS.sleep,
		},
		{
			emoji: ACTIVITY_EMOJIS.commute,
			label: "Commute",
			weeks: activityBreakdown.commute,
			color: ACTIVITY_COLORS.commute,
		},
		{
			emoji: ACTIVITY_EMOJIS.admin,
			label: "Life admin",
			weeks: activityBreakdown.admin,
			color: ACTIVITY_COLORS.admin,
		},
	];

	const skillsToMaster = Math.floor(totalFreeHoursWithRetirement / 10000);
	const booksToRead = Math.floor(totalFreeHoursWithRetirement / 6);
	const countriesToVisit = Math.floor(remainingYears * 2);

	return (
		<div className="flex flex-col items-center gap-1">
			{/* Activity breakdown row */}
			<div className="flex items-center gap-3 flex-wrap justify-center">
				{activities.map(({ emoji, label, weeks, color }) => (
					<div key={label} className="flex items-center gap-1 text-xs text-muted-foreground">
						<span>{emoji}</span>
						<span style={{ color }}>{weeks.toLocaleString()}</span>
						<span>wks {label.toLowerCase()}</span>
					</div>
				))}
			</div>

			{/* Free time highlight */}
			<div className="flex items-center gap-3 text-center">
				<div>
					<span className="text-xl font-bold text-white">
						{activityBreakdown.free.toLocaleString()}
					</span>
					<span className="text-[10px] text-muted-foreground ml-1">free weeks</span>
				</div>
				<span className="text-muted-foreground/40">|</span>
				<div>
					<span className="text-base font-semibold text-white/80">
						{freeRemainingDays.toLocaleString()}
					</span>
					<span className="text-[10px] text-muted-foreground ml-1">days</span>
				</div>
				<span className="text-muted-foreground/40">|</span>
				<div>
					<span className="text-base font-semibold text-white/80">
						{totalFreeHoursWithRetirement.toLocaleString()}
					</span>
					<span className="text-[10px] text-muted-foreground ml-1">hours</span>
				</div>
			</div>

			{/* Fun context stats */}
			<div className="flex items-center gap-4 flex-wrap justify-center mt-1">
				<div className="flex items-center gap-1.5 text-xs">
					<span>🎯</span>
					<span className="text-white font-medium">{skillsToMaster}</span>
					<span className="text-muted-foreground">skills to master</span>
				</div>
				<div className="flex items-center gap-1.5 text-xs">
					<span>📚</span>
					<span className="text-white font-medium">{booksToRead.toLocaleString()}</span>
					<span className="text-muted-foreground">books to read</span>
				</div>
				<div className="flex items-center gap-1.5 text-xs">
					<span>✈️</span>
					<span className="text-white font-medium">{countriesToVisit}</span>
					<span className="text-muted-foreground">countries to visit</span>
				</div>
			</div>
		</div>
	);
};

export default SummaryStats;
