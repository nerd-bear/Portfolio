<script lang="ts">
	type ExperienceItem = {
		title: string;
		org: string;
		location?: string;
		start?: string;
		end?: string;
		summary?: string;
		bullets?: string[];
		tags?: readonly string[];
	};

	export let title = 'Experience';
	export let academic: readonly ExperienceItem[] = [];
	export let professional: readonly ExperienceItem[] = [];

	let tab: 'academic' | 'professional' = 'academic';

	let academicBtn: HTMLButtonElement;
	let professionalBtn: HTMLButtonElement;
	let indicatorStyle = '';

	function updateIndicator(el: HTMLButtonElement | undefined) {
		if (!el) return;

		const PADDING = 4;
		indicatorStyle = `transform: translateX(${PADDING + el.offsetLeft}px); width: ${el.offsetWidth}px;`;
	}

	$: {
		if (academicBtn && professionalBtn) {
			updateIndicator(tab === 'academic' ? academicBtn : professionalBtn);
		}
	}

	function handleResize() {
		updateIndicator(tab === 'academic' ? academicBtn : professionalBtn);
	}
</script>

<svelte:window on:resize={handleResize} />

<section class="w-full max-w-5xl">
	<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<h2 class="text-2xl font-medium tracking-tight text-zinc-200">{title}</h2>
			<p class="mt-1 text-sm text-zinc-500">My academic and professional experience</p>
		</div>

		<div
			class="relative inline-flex items-center rounded-full bg-black/20 p-1 ring-1 ring-white/10"
		>
			<span
				class="absolute inset-y-1 left-0 rounded-full bg-zinc-950/70 ring-1 ring-white/10 transition-all duration-200 ease-out"
				style={indicatorStyle}
			></span>
			<button
				bind:this={academicBtn}
				type="button"
				class={`relative z-10 rounded-full px-4 py-2 text-sm transition ${
					tab === 'academic' ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
				}`}
				on:click={() => (tab = 'academic')}
			>
				Academic
			</button>

			<button
				bind:this={professionalBtn}
				type="button"
				class={`relative z-10 rounded-full px-4 py-2 text-sm transition ${
					tab === 'professional' ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
				}`}
				on:click={() => (tab = 'professional')}
			>
				Professional
			</button>
		</div>
	</div>

	<div class="rounded-3xl bg-zinc-950/60 p-4 shadow-xl ring-1 ring-white/10 sm:p-5">
		{#if tab === 'academic'}
			{#if academic.length === 0}
				<p class="text-sm text-zinc-400">No academic experience added yet.</p>
			{:else}
				<div class="grid gap-4 sm:grid-cols-2">
					{#each academic as item (item.title + item.org)}
						<div
							class="rounded-3xl bg-black/20 p-5 ring-1 ring-white/10 transition duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:bg-black/25"
						>
							<div class="flex items-start justify-between gap-3">
								<div>
									<div class="font-semibold text-zinc-100">{item.title}</div>
									<div class="text-sm text-zinc-400">
										{item.org}{item.location ? ` • ${item.location}` : ''}
									</div>
								</div>
								{#if item.start || item.end}
									<div class="shrink-0 text-xs text-zinc-500">
										{item.start ?? ''}{item.start && item.end ? ' — ' : ''}{item.end ?? ''}
									</div>
								{/if}
							</div>

							{#if item.summary}
								<p class="mt-3 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
							{/if}

							{#if item.bullets?.length}
								<ul class="mt-3 space-y-1 text-sm text-zinc-300">
									{#each item.bullets as b}
										<li class="flex gap-2">
											<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600"></span>
											<span>{b}</span>
										</li>
									{/each}
								</ul>
							{/if}

							{#if item.tags?.length}
								<div class="mt-4 flex flex-wrap gap-2">
									{#each item.tags as t}
										<span
											class="rounded-full bg-black/30 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
										>
											{t}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		{:else if professional.length === 0}
			<p class="text-sm text-zinc-400">No professional experience added yet.</p>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2">
				{#each professional as item (item.title + item.org)}
					<div
						class="rounded-3xl bg-black/20 p-5 ring-1 ring-white/10 transition duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:bg-black/25"
					>
						<div class="flex items-start justify-between gap-3">
							<div>
								<div class="font-semibold text-zinc-100">{item.title}</div>
								<div class="text-sm text-zinc-400">
									{item.org}{item.location ? ` • ${item.location}` : ''}
								</div>
							</div>
							{#if item.start || item.end}
								<div class="shrink-0 text-xs text-zinc-500">
									{item.start ?? ''}{item.start && item.end ? ' — ' : ''}{item.end ?? ''}
								</div>
							{/if}
						</div>

						{#if item.summary}
							<p class="mt-3 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
						{/if}

						{#if item.bullets?.length}
							<ul class="mt-3 space-y-1 text-sm text-zinc-300">
								{#each item.bullets as b}
									<li class="flex gap-2">
										<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600"></span>
										<span>{b}</span>
									</li>
								{/each}
							</ul>
						{/if}

						{#if item.tags?.length}
							<div class="mt-4 flex flex-wrap gap-2">
								{#each item.tags as t}
									<span
										class="rounded-full bg-black/30 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
									>
										{t}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
