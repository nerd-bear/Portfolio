<script lang="ts">
	import CodeWindow from '$lib/components/CodeWindow.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';

	const academic = [
		{
			title: 'RAF Air Cadets',
			org: 'Royal Air Force Air Cadets',
			location: 'United Kingdom',
			start: '2025',
			end: 'Present',
			summary:
				'Participating in airmanship, leadership, and technical training while developing teamwork and fairly complex problem solving skills.',
			bullets: [
				'Completed leadership and fieldcraft training exercises',
				'Participated in flying exercises in the Grob Tutor',
				'Completed Initial Weapons Training and Live Fire Marksmanship Training'
			],
			tags: ['Leadership', 'Flying', 'Marksmanship']
		},
		{
			title: 'Computer Science Studies',
			org: 'Self Directed Learning',
			start: '2020',
			end: 'Present',
			summary:
				'Focused on programming languages, systems development, and modern web technologies through independent study.',
			bullets: [
				'Built multiple personal software projects',
				'Learned low-level and high-level programming concepts',
				'Explored compilers and programming language design'
			],
			tags: ['Programming', 'Systems', 'Web']
		},
		{
			title: 'Bassil Programming Language',
			org: 'Personal',
			start: '2024',
			end: '2026',
			summary:
				'I created a programming language in C++ that can compile to an executable or transpile to bytecode',
			bullets: [
				'Developed a complied programming language in C++',
				'Completed with zero external libraries or frameworks',
				'Good balance between high level language patterns and low level control'
			],
			tags: ['C++', 'Programming language', 'Compiled']
		}
	];

	const professional = [
		{
			title: 'Senior Training Officer',
			org: 'Jugendfeuerwehr',
			location: 'Germany',
			start: '2018',
			end: '2024',
			summary:
				'Supported rescue and emergency service training programs, helping coordinate instruction and practical exercises.',
			bullets: [
				'Assisted in structured training sessions',
				'Helped mentor younger participants',
				'Supported safety-focused practical exercises'
			],
			tags: ['Training', 'Leadership', 'Emergency Services']
		},
		{
			title: 'Freelance Development',
			org: 'Independent',
			start: '2024',
			end: 'Present',
			summary:
				'During 2024-2025 I worked for 10+ privately contracted companies, and a few dozen private individual clients.',
			bullets: [
				'Built software for commercial and individual clients',
				'Managed multiple clients with custom design workflows',
				'Worked primarily in C++, C and pythons'
			],
			tags: ['Git', 'Web Dev', 'Architecture']
		},
		{
			title: 'Discord Bot Work',
			org: 'GitHub',
			start: '2024',
			end: 'Present',
			summary:
				'I created a discord bot that is in 16,000+ discord servers and verified by Discord.',
			bullets: [
				'16,000+ Discord Servers',
				'Implemented with over 40,000 lines of code and 5 programming languages',
				'Collaborated with dozens of people and many other discord bots'
			],
			tags: ['Disnake/Python', 'Advertisement', 'Brand Sustainability']
		}
	];

	// Why calculate my exact age? Why not, its 10x better than manually updating it (I hope)

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

<svelte:head>
	<title>Iona Mitterfellner Dev</title>
	<meta
		name="description"
		content="{getAge(
			'2011-03-02'
		)} year old software developer, systems programming, and website dev."
	/>

	<!-- canonical -->
	<link rel="canonical" href="https://nerdbear.org/" />

	<!-- open graph -->
	<meta property="og:site_name" content="Iona Mitterfellner" />
	<meta property="og:title" content="Iona Mitterfellner — Developer" />
	<meta
		property="og:description"
		content="Developer portfolio: projects, experience, and contact. Building with SvelteKit, Python, C/C++, and more."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nerdbear.org/" />
	<meta property="og:image" content="https://nerdbear.org/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Iona Mitterfellner — Developer Portfolio preview" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Iona Mitterfellner — Developer" />
	<meta
		name="twitter:description"
		content="Projects, experience, and contact — built with SvelteKit, Python, and low-level languages."
	/>
	<meta name="twitter:image" content="https://nerdbear.org/og.png" />
	<meta name="twitter:image:alt" content="Iona Mitterfellner — Developer Portfolio preview" />
	<meta name="theme-color" content="#09090b" />
</svelte:head>

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

		<Experience title="Experience" {academic} {professional} />
	</div>
</div>
