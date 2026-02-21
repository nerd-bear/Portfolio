<script lang="ts">
	export let label = 'More';
</script>

<div class="group fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
	<div
		class="inline-flex items-center gap-2 rounded-full bg-zinc-950/70 px-4 py-2 text-sm text-zinc-300 shadow-xl ring-1 ring-white/10 backdrop-blur transition hover:bg-zinc-950/80"
	>
		<span class="inline-block h-2 w-2 rounded-full bg-fuchsia-400/80"></span>
		<span>{label}</span>
	</div>

	<div
		class="pointer-events-none absolute bottom-12 left-1/2 w-[min(520px,92vw)] -translate-x-1/2 translate-y-2 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
	>
		<div class="rounded-3xl bg-zinc-950/85 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur">
			<div class="mb-2 text-sm font-semibold text-zinc-200">A bit more about me</div>

			<ul class="space-y-2 text-sm leading-relaxed text-zinc-300">
				<li>
					<span class="text-zinc-500">•</span>
					I’m an <span class="font-semibold text-violet-300">RAF Air Cadets</span> cadet.
				</li>
				<li>
					<span class="text-zinc-500">•</span>
					I’ve spent years as a
					<span class="font-semibold text-amber-300">Senior Training Officer</span>
					in the
					<span class="font-semibold text-fuchsia-300"
						>Jugendfeuerwehr</span
					>
					(German national rescue & emergency service training).
				</li>
			</ul>
		</div>
	</div>
</div>
