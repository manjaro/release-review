import z from "zod";

export type Env = {};

const paramsValidator = z.object({
	mode: z.enum(["nightly", "latest"]),
	arch: z.enum(["x86_64", "aarch64"]),
	branch: z.enum(["stable", "testing", "unstable"]),
	edition: z.enum(["xfce", "gnome", "kde", "minimal", "i3", "cinnamon"]),
});

type Release = {
	test: string;
};

export const onRequest: PagesFunction<Env> = async (context) => {
	const input = paramsValidator.safeParse(context.params);

	if (!input.success) {
		return Response.json("Invalid request", {
			status: 400,
			headers: { "content-type": "application/json" },
		});
	}

	const cache = caches.default;
	const response = await cache.match(context.request);

	if (response) {
		console.info("cache hit");
		return response;
	}

	let release = {};

	try {
		if (input.data.mode === "latest") {
			const result = await (
				await fetch(
					"https://api.github.com/repos/manjaro-contrib/release-review/releases/latest",
				)
			).json<Release>();
			release = result;
		} else {
			const result = await fetch(
				"https://api.github.com/repos/manjaro-contrib/release-review/releases",
			);
			const releases = await result.json<Release[]>();
			release = releases[0];
		}
	} catch {
		return Response.json("Not found", { status: 404 });
	}

	return Response.json(release, {
		headers: {
			"content-type": "application/json",
			"Cache-Control": `public, max-age=${60 * 5}, s-maxage=${
				60 * 5
			}, stale-while-revalidate=${60 * 10}`,
		},
	});
};
