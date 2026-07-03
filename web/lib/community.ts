// Lightweight, automatic policy filter for community content. This is a first
// line of defence (obvious slurs/insults/spam); manual moderation via the admin
// area handles everything the word filter can't judge. Extend BANNED as needed.
const BANNED = [
  // German insults / vulgarities
  "arschloch",
  "wichser",
  "hurensohn",
  "fotze",
  "schlampe",
  "missgeburt",
  "spast",
  "nutte",
  // English profanity / slurs
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "cunt",
  "nigger",
  "faggot",
  "retard",
];

// Normalise common obfuscation (spaces / punctuation between letters, digit
// look-alikes) before matching, so "a-s-s" or "sh1t" is still caught.
function normalise(text: string) {
  return text
    .toLowerCase()
    .replace(/[\s._\-*]+/g, "")
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/@/g, "a")
    .replace(/\$/g, "s");
}

export function violatesPolicy(...parts: string[]): boolean {
  const haystack = normalise(parts.join(" "));
  return BANNED.some((word) => haystack.includes(word));
}

export const LIMITS = {
  title: 140,
  body: 5000,
};
