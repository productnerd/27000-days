import React, { useState } from "react";
import DobForm from "@/components/life-in-weeks/DobForm";
import LifeInWeeksView from "@/components/life-in-weeks/LifeInWeeksView";
import { Switch } from "@/components/ui/form/switch";

const STORAGE_KEY = "life-in-weeks-dob";
const WEIGHTS_KEY = "life-in-weeks-weights";
const SALARY_KEY = "life-in-weeks-salary";
const DEFAULT_DOB_YM = "1980-01";
const DEFAULT_SALARY = 50000;

// Only stats that compete for time are allocatable
const STAT_KEYS = [
	"skills", "books", "countries", "languages", "instruments",
	"careers", "hobbies", "recipes", "roadtrips", "friendships",
];

function getDefaultWeights(): Record<string, number> {
	const eq = 100 / STAT_KEYS.length;
	const w: Record<string, number> = {};
	STAT_KEYS.forEach((k) => { w[k] = eq; });
	return w;
}

function loadWeights(): Record<string, number> {
	try {
		const stored = localStorage.getItem(WEIGHTS_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			// Ensure all keys exist
			const defaults = getDefaultWeights();
			for (const key of STAT_KEYS) {
				if (typeof parsed[key] !== "number") parsed[key] = defaults[key];
			}
			return parsed;
		}
	} catch { /* ignore */ }
	return getDefaultWeights();
}

function loadSalary(): number {
	try {
		const stored = localStorage.getItem(SALARY_KEY);
		if (stored) {
			const val = parseInt(stored, 10);
			if (!isNaN(val) && val >= 0) return val;
		}
	} catch { /* ignore */ }
	return DEFAULT_SALARY;
}

const LifeInWeeksPage: React.FC = () => {
	const [dob, setDob] = useState<Date>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		const ym = stored || DEFAULT_DOB_YM;
		const date = new Date(ym + "-01T00:00:00");
		return isNaN(date.getTime()) ? new Date(DEFAULT_DOB_YM + "-01T00:00:00") : date;
	});
	const [showPhases, setShowPhases] = useState(true);
	const [showUsefulTime, setShowUsefulTime] = useState(true);
	const [showJob, setShowJob] = useState(false);
	const [weights, setWeights] = useState<Record<string, number>>(loadWeights);
	const [salary, setSalary] = useState<number>(loadSalary);
	const [editingSalary, setEditingSalary] = useState(false);
	const [salaryInput, setSalaryInput] = useState(String(salary));

	const handleDobSubmit = (date: Date) => {
		const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
		localStorage.setItem(STORAGE_KEY, ym);
		setDob(date);
	};

	const handleWeightsChange = (newWeights: Record<string, number>) => {
		setWeights(newWeights);
		localStorage.setItem(WEIGHTS_KEY, JSON.stringify(newWeights));
	};

	const handleSalarySubmit = () => {
		const val = parseInt(salaryInput.replace(/[^0-9]/g, ""), 10);
		if (!isNaN(val) && val >= 0) {
			setSalary(val);
			localStorage.setItem(SALARY_KEY, String(val));
		} else {
			setSalaryInput(String(salary));
		}
		setEditingSalary(false);
	};

	const storedYm = localStorage.getItem(STORAGE_KEY) || DEFAULT_DOB_YM;

	return (
		<div className="h-screen flex flex-col justify-center p-3 gap-1">
			{/* Header */}
			<div className="flex items-center justify-between shrink-0 relative z-50 py-1 px-1">
				<div className="flex items-center gap-3">
					<DobForm onSubmit={handleDobSubmit} initialDob={storedYm} />
					{editingSalary ? (
						<div className="flex items-center gap-1">
							<span className="text-xs text-muted-foreground">€</span>
							<input
								type="text"
								value={salaryInput}
								onChange={(e) => setSalaryInput(e.target.value)}
								onBlur={handleSalarySubmit}
								onKeyDown={(e) => { if (e.key === "Enter") handleSalarySubmit(); if (e.key === "Escape") { setSalaryInput(String(salary)); setEditingSalary(false); } }}
								className="w-20 bg-white/10 border border-white/20 rounded px-1.5 py-0.5 text-xs text-foreground outline-none focus:border-white/40"
								autoFocus
							/>
							<span className="text-xs text-muted-foreground">/yr</span>
						</div>
					) : (
						<button
							onClick={() => { setSalaryInput(String(salary)); setEditingSalary(true); }}
							className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
						>
							€{salary.toLocaleString()}/yr
						</button>
					)}
				</div>
				<div className="flex items-center gap-3">
					<label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
						<Switch checked={showPhases} onCheckedChange={setShowPhases} className="scale-75" />
						Life Phases
					</label>
					<label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
						<Switch checked={showUsefulTime} onCheckedChange={setShowUsefulTime} className="scale-75" />
						Useful Time
					</label>
					<label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
						<Switch checked={showJob} onCheckedChange={setShowJob} className="scale-75" />
						Job
					</label>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 min-h-0 overflow-hidden">
				<LifeInWeeksView
					dob={dob}
					showPhases={showPhases}
					showUsefulTime={showUsefulTime}
					showJob={showJob}
					salary={salary}
					weights={weights}
					onWeightsChange={handleWeightsChange}
				/>
			</div>

			{/* Handwritten note */}
			<p className="text-[20px] italic text-muted-foreground/40 text-right pr-4 shrink-0" style={{ fontFamily: "'Caveat', cursive" }}>
				Kind reminder: live now. There is so much to be experienced!
			</p>
		</div>
	);
};

export default LifeInWeeksPage;
