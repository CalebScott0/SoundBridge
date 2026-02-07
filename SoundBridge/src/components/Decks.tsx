export function Decks() {
    return (
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-lg">
            <h1 className="text-3xl font-semibold">Your Deck</h1>
            <p className="mt-2 text-sm text-slate-300">
                Producers who want to collaborate with you.
            </p>

            <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm font-semibold">Neon Arc</p>
                    <p className="text-xs text-slate-300">Synthwave Producer · Los Angeles</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm font-semibold">Echo Valley</p>
                    <p className="text-xs text-slate-300">Indie Producer · Austin</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm font-semibold">Marin Aoki</p>
                    <p className="text-xs text-slate-300">Pop Producer · NYC</p>
                </div>
            </div>
        </div>
    );
}