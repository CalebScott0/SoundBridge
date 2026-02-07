import { Button } from "@/components/ui/button";

interface FooterProps {
  onExplore?: () => void;
  onDeck?: () => void;
	onProfile?: () => void;
}

export function Footer({ onExplore, onDeck, onProfile }: FooterProps) {
	return (
		<footer className="fixed bottom-0 left-0 right-0 border-t border-red-900/60 bg-black/90 px-4 py-3 backdrop-blur">
			<div className="mx-auto flex w-full max-w-lg items-center justify-between gap-3">
				<Button
					variant="outline"
					className="flex-1 border-red-900/60 bg-red-950/40 text-amber-100 hover:bg-red-900/40"
					onClick={onExplore}
				>
					<span className="flex items-center justify-center gap-2">
						<svg
							viewBox="0 0 24 24"
							className="h-4 w-4"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M12 3l3.5 7.09L23 11l-5.5 5.36L18.5 23 12 19.27 5.5 23l1-6.64L1 11l7.5-.91L12 3z" />
						</svg>
					</span>
				</Button>
				<Button
					variant="outline"
					className="flex-1 border-red-900/60 bg-red-950/40 text-amber-100 hover:bg-red-900/40"
					onClick={onDeck}
				>
					<span className="flex items-center justify-center gap-2">
						<svg
							viewBox="0 0 24 24"
							className="h-4 w-4"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M4 5h16a1 1 0 0 1 1 1v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6a1 1 0 0 1 1-1zm3 3a3 3 0 1 0 0 6h10a3 3 0 1 0 0-6H7z" />
						</svg>
					</span>
				</Button>
				<Button
					variant="outline"
					className="flex-1 border-red-900/60 bg-red-950/40 text-amber-100 hover:bg-red-900/40"
					onClick={onProfile}
				>
					<span className="flex items-center justify-center gap-2">
						<svg
							viewBox="0 0 24 24"
							className="h-4 w-4"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
						</svg>
					</span>
				</Button>
			</div>
		</footer>
	);
}
