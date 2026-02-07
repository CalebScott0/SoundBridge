import { Button } from "@/components/ui/button";

export function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur">
			<div className="mx-auto flex w-full max-w-lg items-center justify-between gap-3">
				<Button
					variant="outline"
					className="flex-1 border-indigo-400/40 bg-white/5 text-indigo-100 hover:bg-indigo-500/20"
				>
					Explore
				</Button>
				<Button
					variant="outline"
					className="flex-1 border-emerald-400/40 bg-white/5 text-emerald-100 hover:bg-emerald-500/20"
				>
					Deck
				</Button>
				<Button
					variant="outline"
					className="flex-1 border-slate-400/40 bg-white/5 text-slate-100 hover:bg-slate-500/20"
				>
					Profile
				</Button>
			</div>
		</footer>
	);
}
