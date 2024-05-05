import z from "zod";

const paramsValidator = z.object({
  search: z.string(),
  mode: z.enum(["release", "pre-release"]),
});

type Release = {
  assets: { name: string; browser_download_url: string }[];
  created_at: string;
};

/**
 * Github expects a User-Agent header to be set
 */
const ghInit = {
  headers: {
    "User-Agent": "release-review",
    Accept: "application/vnd.github+json",
  },
  cf: {
    cacheTtl: 60 * 10,
  },
} satisfies RequestInit<RequestInitCfProperties>;

let ghRepo = "manjaro-contrib/release-review";

export const onRequest: PagesFunction = async (context) => {
  const params = paramsValidator.safeParse(context.params);

  if (!params.success) {
    return Response.json(
      { error: params.error },
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const cache = caches.default;
  const response = await cache.match(context.request);

  if (response) {
    console.info("cache hit");
    return response;
  }

  if (params.data.search.includes("sway")) {
    ghRepo = "manjaro-sway/manjaro-sway";
  }

  let release: Release;

  try {
    if (params.data.mode === "release") {
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

  const regex = new RegExp(params.data.search, "i");
  const assets = release.assets
    .filter((asset) => regex.test(asset.name))
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
