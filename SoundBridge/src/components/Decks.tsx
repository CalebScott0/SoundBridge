export function Decks() {
    return (
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-red-900/60 bg-black/40 p-8 text-amber-100 shadow-lg">
            <h1 className="text-3xl font-semibold">Your Deck</h1>
            <p className="mt-2 text-sm text-amber-200/80">
                Producers who want to collaborate with you.
            </p>

            <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-red-900/40 bg-black/50 p-4">
                    <p className="text-sm font-semibold">Neon Arc</p>
                    <p className="text-xs text-amber-200/80">Synthwave Producer · Los Angeles</p>
                </div>
                <div className="rounded-2xl border border-red-900/40 bg-black/50 p-4">
                    <p className="text-sm font-semibold">Echo Valley</p>
                    <p className="text-xs text-amber-200/80">Indie Producer · Austin</p>
                </div>
                <div className="rounded-2xl border border-red-900/40 bg-black/50 p-4">
                    <p className="text-sm font-semibold">Marin Aoki</p>
                    <p className="text-xs text-amber-200/80">Pop Producer · NYC</p>
                </div>
            </div>
        </div>
    );
}