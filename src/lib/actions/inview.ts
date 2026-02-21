export function inview(
	node: HTMLElement,
	opts: { y?: number; duration?: number; delay?: number } = {}
) {
	const y = opts.y ?? 10;
	const duration = opts.duration ?? 220;
	const delay = opts.delay ?? 0;

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;

	const io = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting) {
				node.style.opacity = '1';
				node.style.transform = 'translateY(0px)';
				io.disconnect();
			}
		},
		{ threshold: 0.15 }
	);

	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}