![Website Deploy](https://deploy-badge.vercel.app/?url=http://o-imports.vercel.app/&name=o-imports)

# Why o-imports?
Being a pain-in-the-ass kinda issue for almost all the JR. Devs who always gets feedback to organize messy imports during code reviews, someone had to solve this. It's so simple, give messy imports to the engine and get 'em organized, phew!

# Quick Demo?
[<img src="https://cdn.loom.com/sessions/thumbnails/f002d53807224c11b221ba67157cc061-1720218183061-with-play.gif" />](https://www.loom.com/share/f002d53807224c11b221ba67157cc061?sid=97948d84-6e13-4594-9246-753305695306)

# Built with
NextJs, TailwindCss, ShadCN, Lucide, Replicate (Llama 3 70B Instruct)

# Why Replicate instead of OpenAI's GPT?
The engine originally ran on OpenAI's GPT, but that integration expired and stopped serving requests. We migrated to the [Replicate](https://replicate.com/) SDK running `meta/meta-llama-3-70b-instruct` — an open model that keeps the organizer running reliably without depending on the expired OpenAI setup. A system prompt and a small JSON-extraction helper keep the model's output contract stable for the API route.
