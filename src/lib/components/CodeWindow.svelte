<script lang="ts">
	export let title = 'About me';

	export let name = 'Iona Mitterfellner';
	export let age = 67;
	export let skills = 'website development';

	export let handle = '@nerd-bear';
	export let href = '#';

	export let email = 'nerd.bear.dev@gmail.com';
	export let mailto = 'mailto:nerd.bear.dev@gmail.com';
</script>

<div
	class="w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-950/80 shadow-2xl ring-1 ring-white/10"
>
	<div class="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
		<div class="flex items-center gap-3">
			<span class="h-3 w-3 rounded-full bg-red-500/90 sm:h-4 sm:w-4"></span>
			<span class="h-3 w-3 rounded-full bg-yellow-400/90 sm:h-4 sm:w-4"></span>
			<span class="h-3 w-3 rounded-full bg-green-500/90 sm:h-4 sm:w-4"></span>
		</div>

		<div class="flex min-w-0 items-center gap-3 text-zinc-400">
			<span class="inline-flex h-9 w-9 items-center justify-center text-white">
				<svg class="h-9 w-9" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
					><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
						d="M360.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm64.6 136.1c-12.5 12.5-12.5 32.8 0 45.3l73.4 73.4-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0zm-274.7 0c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 150.6 182.6c12.5-12.5 12.5-32.8 0-45.3z"
					/></svg
				>
			</span>
			<span class="text-lg font-medium tracking-tight whitespace-nowrap sm:text-xl lg:text-2xl"
				>{title}</span
			>

			<div class="group relative">
				<span
					class="inline-flex cursor-default items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10 backdrop-blur transition select-none hover:bg-black/50"
				>
					<span class="h-1.5 w-1.5 rounded-full bg-fuchsia-400/80"></span>
					<span class="font-mono text-zinc-200">&gt;</span>
					<span class="font-mono">more --personal</span>
					<span class="text-zinc-500">hover</span>
				</span>

				<div
					class="pointer-events-none absolute top-8 left-0 z-50 mr-2 w-[min(520px,92vw)] translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
				>
					<div class="rounded-2xl bg-zinc-950/90 p-4 shadow-2xl ring-1 ring-white/10 backdrop-blur">
						<p class="text-sm leading-relaxed text-zinc-300">
							I’m an <span class="font-semibold text-violet-300">RAF Air Cadets</span> cadet and
							have spent years as a
							<span class="font-semibold text-amber-300">Senior Training Officer</span> in the
							<span class="font-semibold text-fuchsia-300">Jugendfeuerwehr</span>
							(German national rescue &amp; emergency service training).
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="w-21"></div>
	</div>

	<div class="px-6 pb-7">
		<div class="rounded-2xl bg-zinc-950/60 px-5 py-6 ring-1 ring-white/10">
			<pre
				class="font-mono text-[15px] leading-[1.65] wrap-break-word whitespace-pre-wrap text-zinc-200 sm:text-[20px] lg:text-[28px]">
<span class="text-zinc-500 select-none">1</span>  Hello there<span class="text-zinc-500">,</span
				> My name is <span class="text-[18px] font-bold text-violet-400 sm:text-[22px] lg:text-4xl"
					>{name}</span
				>
<span class="text-zinc-500 select-none">2</span>
<span class="text-zinc-500 select-none">3</span>  I am a <span
					class="text-[18px] font-bold text-amber-300 sm:text-[22px] lg:text-4xl">{age}</span
				> year old software developer<span class="text-zinc-500">,</span> with
<span class="text-zinc-500 select-none">4</span>  additional skills in <span
					class="text-[18px] font-bold text-fuchsia-400 sm:text-[22px] lg:text-4xl">{skills}</span
				></pre>
		</div>

		<div class="mt-6 flex flex-wrap justify-end gap-4">
			<a
				href={mailto}
				class="inline-flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 text-base text-zinc-100 ring-1 ring-white/10 transition hover:bg-black/55 sm:px-6 sm:py-3 sm:text-xl lg:text-2xl"
			>
				<span class="inline-flex h-10 w-10 items-center justify-center rounded-full">
					<!-- <svg viewBox="0 0 24 24" class="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 fill-current">
						<path
							d="M2 6c0-1.1.9-2 2-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0l8 5 8-5H4zm16 12V9l-8 5-8-5v9h16z"
						/>
					</svg> -->
					<svg
						viewBox="0 0 512 512"
						class="h-5 w-5 fill-current sm:h-6 sm:w-6 lg:h-7 lg:w-7"
						aria-hidden="true"
					>
						<path
							d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"
						/>
					</svg>
				</span>

				<span class="font-semibold">{email}</span>
			</a>

			<a
				{href}
				class="inline-flex items-center gap-3 rounded-full bg-black/40 px-6 py-3 text-2xl text-zinc-100 ring-1 ring-white/10 transition hover:bg-black/55"
			>
				<span class="inline-flex h-10 w-10 items-center justify-center rounded-full">
					<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current sm:h-6 sm:w-6 lg:h-7 lg:w-7">
						<path
							d="M12 .5C5.73.5.75 5.6.75 12c0 5.13 3.29 9.48 7.86 11.02.58.11.79-.26.79-.57v-2.1c-3.2.71-3.87-1.57-3.87-1.57-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.22 1.76 1.22 1.02 1.78 2.68 1.27 3.33.97.1-.76.4-1.27.72-1.56-2.55-.3-5.24-1.31-5.24-5.82 0-1.29.45-2.35 1.2-3.18-.12-.3-.52-1.52.11-3.17 0 0 .97-.32 3.18 1.22.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.54 3.18-1.22 3.18-1.22.63 1.65.23 2.87.11 3.17.74.83 1.2 1.89 1.2 3.18 0 4.52-2.7 5.52-5.27 5.81.41.37.78 1.1.78 2.22v3.29c0 .31.21.68.8.57C19.96 21.48 23.25 17.13 23.25 12 23.25 5.6 18.27.5 12 .5Z"
						/>
					</svg>
				</span>

				<span class="font-semibold">{handle}</span>
			</a>
		</div>
	</div>
</div>
