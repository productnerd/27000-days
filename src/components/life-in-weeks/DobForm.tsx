import React, { useState } from "react";
import { Button } from "@/components/ui/interactive/button";

interface DobFormProps {
	onSubmit: (dob: Date) => void;
	initialDob?: string;
}

const MONTHS = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i);

const DEFAULT_YEAR = 1980;
const DEFAULT_MONTH = 0; // January

function parseInitialDob(dob?: string) {
	if (!dob) return { year: DEFAULT_YEAR, month: DEFAULT_MONTH };
	const [y, m] = dob.split("-").map(Number);
	return { year: y || DEFAULT_YEAR, month: (m || 1) - 1 };
}

const DobForm: React.FC<DobFormProps> = ({ onSubmit, initialDob }) => {
	const initial = parseInitialDob(initialDob);
	const [year, setYear] = useState(initial.year);
	const [month, setMonth] = useState(initial.month);

	const handleSubmit = () => {
		const date = new Date(year, month, 1);
		if (date > new Date()) return;
		onSubmit(date);
	};

	const isCurrentYear = year === currentYear;

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex items-center gap-3">
				<label className="text-sm text-muted-foreground whitespace-nowrap">
					Born
				</label>

				{/* Month picker */}
				<div className="grid grid-cols-6 gap-1">
					{MONTHS.map((m, i) => {
						const disabled = isCurrentYear && i > currentMonth;
						return (
							<button
								key={m}
								disabled={disabled}
								onClick={() => setMonth(i)}
								className={`px-2 py-1 text-xs rounded-md transition-colors ${
									i === month
										? "bg-primary text-primary-foreground"
										: disabled
										? "text-muted-foreground/30 cursor-not-allowed"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
								}`}
							>
								{m}
							</button>
						);
					})}
				</div>
			</div>

			<div className="flex items-center gap-3">
				{/* Year scroller */}
				<select
					value={year}
					onChange={(e) => {
						const y = Number(e.target.value);
						setYear(y);
						if (y === currentYear && month > currentMonth) setMonth(currentMonth);
					}}
					className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
				>
					{YEARS.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>

				<Button onClick={handleSubmit} size="sm" className="h-8">
					Visualize My Life
				</Button>
			</div>
		</div>
	);
};

export default DobForm;
