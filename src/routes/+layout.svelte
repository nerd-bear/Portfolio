<script lang="ts">
	import './layout.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();

	const { children } = $props();
</script>

{@render children()}
