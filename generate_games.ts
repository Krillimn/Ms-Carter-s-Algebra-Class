import fs from 'fs';

const games = [];
const baseGames = [
  { title: "Smash Karts", url: "https://smashkarts.io" },
  { title: "Shell Shockers", url: "https://shellshock.io" },
  { title: "Krunker", url: "https://krunker.io" },
  { title: "1v1.LOL", url: "https://1v1.lol" },
  { title: "Zombs Royale", url: "https://zombsroyale.io" },
  { title: "Surviv.io", url: "https://surviv.io" },
  { title: "Hole.io", url: "https://hole-io.com" },
  { title: "Paper.io 2", url: "https://paper-io.com" },
  { title: "Slither.io", url: "https://slither.io" },
  { title: "Agar.io", url: "https://agar.io" },
  { title: "Skribbl.io", url: "https://skribbl.io" },
  { title: "Venge.io", url: "https://venge.io" },
  { title: "Tetr.io", url: "https://tetr.io" },
  { title: "MooMoo.io", url: "https://moomoo.io" },
  { title: "Diep.io", url: "https://diep.io" },
  { title: "Ev.io", url: "https://ev.io" },
  { title: "Gartic.io", url: "https://gartic.io" },
  { title: "Starve.io", url: "https://starve.io" },
  { title: "Devast.io", url: "https://devast.io" },
  { title: "Little Big Snake", url: "https://littlebigsnake.com" },
  { title: "Build Royale", url: "https://buildroyale.io" },
  { title: "Defly.io", url: "https://defly.io" },
  { title: "Gota.io", url: "https://gota.io" },
  { title: "Wormate.io", url: "https://wormate.io" },
  { title: "Wings.io", url: "https://wings.io" },
  { title: "Deeeep.io", url: "https://deeeep.io" },
  { title: "Brutal.io", url: "https://brutal.io" },
  { title: "Zombs.io", url: "https://zombs.io" },
  { title: "Mope.io", url: "https://mope.io" },
  { title: "Splix.io", url: "https://splix.io" }
];

for(let i=0; i<150; i++) {
  const base = baseGames[i % baseGames.length];
  const suffix = Math.floor(i / baseGames.length) > 0 ? ` (Server ${Math.floor(i / baseGames.length) + 1})` : '';
  games.push({
    id: (i + 1).toString(),
    title: `${base.title}${suffix}`,
    category: "Action",
    url: base.url
  });
}

fs.writeFileSync('src/data/games.json', JSON.stringify(games, null, 2));
