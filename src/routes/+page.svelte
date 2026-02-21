<script lang="ts">
	import AboutHover from '$lib/components/AboutHover.svelte';
	import CodeWindow from '$lib/components/CodeWindow.svelte';
	import Projects from '$lib/components/Projects.svelte';

	function getAge(dateString: string) {
		const today = new Date();
		const birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
		return age;
	}

	const projects = [
		{
			name: 'RAFAC.INFO',
			description:
				'A free, high quality learning resource for RAF Air Cadets, built by cadets who understand cadet life.',
			href: 'https://rafac.info',
			tags: ['Svelte', 'Go', 'Tailwind', 'SQLite'],
			status: 'Live'
		},
		{
			name: 'Memo Discord Bot',
			description: 'A moderation + utility bot with slash commands and logging.',
			href: 'https://memo.nerd-bear.org',
			tags: ['Python', 'Disnake', 'SQLite'],
			status: 'Live'
		},
		{
			name: 'Bassil Programming Language',
			description:
				'Bassil is a modern interpreted language balancing performance, readability, and cross platform development.',
			href: 'https://github.com/nerd-bear/bassil',
			tags: ['C++', 'C', 'ASM'],
			status: 'Live'
		}
	] as const;
</script>

<div class="min-h-screen bg-zinc-950 px-4 py-6 sm:p-6">
	<div class="mx-auto flex max-w-5xl flex-col items-center gap-10">
		<CodeWindow
			title="About me"
			name="Iona Mitterfellner"
			age={getAge('2011-03-02')}
			skills="website development"
			handle="@nerd-bear"
			href="https://github.com/nerd-bear"
			email="nerd.bear.dev@gmail.com"
			mailto="mailto:nerd.bear.dev@gmail.com"
		/>

		<Projects title="Projects" {projects} />
	</div>
</div>
