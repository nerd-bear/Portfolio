<script lang="ts">
	import { onMount } from 'svelte';

	const navItems = [
		{ label: 'About', href: '/about' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Contact', href: '/contact' }
	];

	const titleText = 'Iona Mitterfellner';
	const paragraphText =
		"14-year-old software developer passionate about low-level programming, graphics rendering, and building innovative solutions that push the boundaries of what's possible.";
	const chars = [...paragraphText];

	// --- Timeline config (edit these only) ---
	const TL = {
		startDelay: 1200,

		nav: { duration: 0.8, stagger: 200 }, // each item starts 140ms after previous
		title: { duration: 1000, gapAfterNav: 250 }, // wait 250ms after nav finishes
		para: { containerFade: 1860, gapAfterTitle: 250, charStagger: 18 }
	} as const;

	// Derived timeline points (no magic numbers scattered around)
	const NAV_TOTAL = TL.nav.duration + (navItems.length - 1) * TL.nav.stagger;
	const TITLE_START = TL.startDelay + NAV_TOTAL + TL.title.gapAfterNav;
	const PARA_START = TITLE_START + TL.title.duration + TL.para.gapAfterTitle;

	let started = false;

	const ms = (n: number) => `${Math.max(0, Math.round(n))}ms`;

	onMount(() => {
		const t = window.setTimeout(() => (started = true), TL.startDelay);
		return () => window.clearTimeout(t);
	});
</script>

<div class="min-h-screen w-screen bg-white text-black flex flex-col">
	<!-- NAV -->
	<nav class="pt-10">
		<ul class="flex justify-center gap-12 text-base font-light">
			{#each navItems as item, i (item.href)}
				<li
					class="nav-item"
					class:nav-in={started}
					style={`--d:${ms(i * TL.nav.stagger)}`}
				>
					<a class="hover:opacity-60 transition" href={item.href}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- HERO -->
	<main class="flex flex-1 items-center justify-center">
		<div class="text-center max-w-2xl px-6">
			<h1
				class="text-6xl font-medium tracking-tight mb-6 title"
				class:title-in={started}
				style={`--title-delay:${ms(TITLE_START - TL.startDelay)}`}
			>
				{titleText}
			</h1>

			<p class="text-lg font-light leading-relaxed text-zinc-700">
				<span
					class="para-wrap"
					class:para-in={started}
					style={`--para-delay:${ms(PARA_START - TL.startDelay)}`}
				>
					{#each chars as ch, i (i)}
						<span
							class="char"
							style={`--cd:${ms((PARA_START - TL.startDelay) + i * TL.para.charStagger)}`}
							aria-hidden="true"
						>
							{ch === ' ' ? '\u00A0' : ch}
						</span>
					{/each}
				</span>
				<span class="sr-only">{paragraphText}</span>
			</p>
		</div>
	</main>

	<footer class="pb-8 text-center text-xs text-zinc-400">
		© {new Date().getFullYear()} Nerd Bear. All rights reserved.
	</footer>
</div>

<style>
	/* -------------------- NAV ITEMS -------------------- */
	.nav-item {
		opacity: 0;
		transform: translateY(-10px); /* move DOWN into place */
		filter: blur(10px);
	}

	.nav-in {
		animation: navIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: var(--d);
	}

	@keyframes navIn {
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	/* -------------------- TITLE -------------------- */
	.title {
		opacity: 0;
		transform: translateY(28px);
		filter: blur(14px);
	}

	.title-in {
		animation: titleIn 920ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: var(--title-delay);
	}

	@keyframes titleIn {
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	/* -------------------- PARAGRAPH -------------------- */
	.para-wrap {
		display: inline-block;
		opacity: 0;
	}

	.para-in {
		animation: paraFade 600ms ease forwards;
		animation-delay: var(--para-delay);
	}

	@keyframes paraFade {
		to {
			opacity: 1;
		}
	}

	.char {
		display: inline-block;
		opacity: 0;
		transform: translateY(3px);
		filter: blur(6px);
		animation: charIn 420ms ease forwards;
		animation-delay: var(--cd);
	}

	@keyframes charIn {
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	/* -------------------- A11Y -------------------- */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-item,
		.title,
		.para-wrap,
		.char {
			animation: none !important;
			opacity: 1 !important;
			transform: none !important;
			filter: none !important;
		}
	}
</style>
