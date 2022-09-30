import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { Repository } from "./types.ts"

const { GITHUB_USERNAME, GITHUB_TOKEN } = config()

const total: Repository[] = []

let page = 1

try { await Deno.mkdir("out") } catch (_) { /* */ }

while(true) {
    console.log(`Getting page: ${page}`)
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100&page=${page}`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${GITHUB_TOKEN}`
        }
    });

    const stars: Repository[] = await res.json()

    if(stars.length == 0) {
        break
    }

    stars.forEach(async (item) => {
        console.log(item.full_name)

        const topics = item.topics.map((item) => `#${item}`).join(" ")
        const contents = [
            `# ${item.full_name}`,
            ``,
            item.description,
            ``,
            `URL: ${item.url}`,
            ``,
            `Language: [[${item.language ?? ""}]]`,
            ``,
            `Topics: ${topics}`,
        ].join("\n")

        const filename = `${item.name}.md`
        await Deno.writeTextFile(`./out/${filename}`, contents)
    })

    total.push(...stars)
    page++
}

await Deno.writeTextFile('./out/_index.md', total.map((item) => `- [${item.full_name}](./${item.name}) - ${item.description}`).join("\n"))

