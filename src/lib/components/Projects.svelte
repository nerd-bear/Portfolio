<script lang="ts">
	import Icon from '@iconify/svelte';

	// If you dare ask why I did a custom icon map, its because I was too lazy to figure out a dynamic solution for a 1 page porfolio
	const iconMap: Record<string, string> = {
		Tailwind: 'devicon:tailwindcss',
		SQLite: 'devicon:sqlite',
		Svelte: 'devicon:svelte',
		Go: 'devicon:go',
		Python: 'devicon:python',
		C: 'devicon:c',
		'C++': 'devicon:cplusplus',
		Disnake: 'logos:discord-icon',
		ASM: 'mdi:chip'
	};

	function getIcon(tag: string) {
		return iconMap[tag] ?? 'mdi:tag';
	}

	type Project = {
		name: string;
		description: string;
		href?: string;
		tags?: readonly string[];
		status?: 'Live' | 'WIP' | 'Archived';
	};

	export let title = 'Projects';
	export let projects: readonly Project[] = [];

	type Status = NonNullable<Project['status']>;

	const statusStyles: Record<Status, string> = {
		Live: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
		WIP: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20',
		Archived: 'bg-zinc-500/15 text-zinc-300 ring-1 ring-white/10'
	};
</script>

<section class="w-full max-w-5xl">
	<div class="mb-4 flex items-end justify-between">
		<h2 class="text-2xl font-medium tracking-tight text-zinc-200">
			{title}
		</h2>
		<p class="text-sm text-zinc-500">A few things I’ve built</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each projects as p}
			<article
				class="group flex h-full flex-col rounded-3xl bg-zinc-950/60 p-5 shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-zinc-950/70"
			>
				<div class="flex flex-col gap-4">
					<div class="flex items-start justify-between gap-3">
						<div>
							<h3 class="text-lg font-semibold text-zinc-100">
								{#if p.href}
									<a
										href={p.href}
										target="_blank"
										rel="noreferrer"
										class="underline decoration-white/10 underline-offset-4 transition group-hover:decoration-white/25"
									>
										{p.name}
									</a>
								{:else}
									{p.name}
								{/if}
							</h3>

							<p class="mt-2 text-sm leading-relaxed text-zinc-400">
								{p.description}
							</p>
						</div>

						{#if p.status}
							<span class={'shrink-0 rounded-full px-3 py-1 text-xs ' + statusStyles[p.status]}>
								{p.status}
							</span>
						{/if}
					</div>

					{#if p.tags?.length}
						<div class="flex flex-wrap gap-2">
							{#each p.tags as t}
								<span
									class="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
								>
									<Icon icon={getIcon(t)} class="h-4 w-4" />
									{t}
								</span>
							{/each}
						</div>
					{/if}
				</div>

				{#if p.href}
					<div class="mt-auto flex items-center gap-2 pt-5 text-sm text-zinc-400">
						<span
							class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 ring-1 ring-white/10"
						>
							<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
								<path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
								<path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
							</svg>
						</span>

						<span class="truncate">{p.href}</span>
					</div>
				{/if}
			</article>
		{/each}
	</div>
</section>
