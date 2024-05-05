import z from "zod";

const paramsValidator = z.object({
  mode: z.enum(["nightly", "release"]),
  arch: z.enum(["x86_64", "arm64"]),
  branch: z.enum(["stable", "testing", "unstable"]),
  edition: z.enum([
    "xfce",
    "gnome",
    "kde",
    "minimal",
    "i3",
    "cinnamon",
    "mate",
    "sway",
  ]),
});

type Release = {
  assets: { name: string; browser_download_url: string }[];
  created_at: string;
};

const ghInit = {
  headers: {
    "User-Agent": "release-review",
    Accept: "application/vnd.github+json",
  },
};

let ghRepo = "manjaro-contrib/release-review";

export const onRequest: PagesFunction = async (context) => {
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

  if (input.data.edition === "sway") {
    ghRepo = "manjaro-sway/manjaro-sway";
  }

  let release: Release;

  try {
    if (input.data.mode === "release") {
      const result = await fetch(
        `https://api.github.com/repos/${ghRepo}/releases/latest`,
        ghInit
      );
      release = await result.json<Release>();
    } else {
      const result = await fetch(
        `https://api.github.com/repos/${ghRepo}/releases?per_page=1`,
        ghInit
      );
      const releases = await result.json<Release[]>();
      release = releases[0];
    }
  } catch (e) {
    console.error(e);
    return Response.json("Not found", { status: 404 });
  }

  console.log({ release: release.assets, input: input.data });

  const assets = release.assets
    .filter(
      (asset) => asset.name.includes("-ARM-") === (input.data.arch === "arm64")
    )
    .filter((asset) => asset.name.includes(`-${input.data.edition}-`))
    .filter((asset) => asset.name.includes(`-${input.data.branch}-`))
    .map((asset) => asset.browser_download_url);

  return Response.json(assets, {
    headers: {
      "content-type": "application/json",
      "Cache-Control": `public, max-age=${60 * 5}, s-maxage=${
        60 * 5
      }, stale-while-revalidate=${60 * 10}`,
    },
  });
};
