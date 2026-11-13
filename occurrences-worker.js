// Background worker: counts where each lexicon item occurs in the Hebrew text,
// so the page stays responsive. Started by script.js as soon as the page loads.
// In:  { formMap: [[form, key], ...], skipTokens, clusterKeys, hebrewText }
// Out: { ok: true, counts } or { ok: false, error }
importScripts("matcher.js");

self.onmessage = function (e) {
    try {
        const { formMap, skipTokens, clusterKeys, hebrewText } = e.data;
        const { computeRanges } = createMatcher(new Map(formMap), skipTokens);
        const counts = countOccurrences(computeRanges, hebrewText, clusterKeys);
        self.postMessage({ ok: true, counts });
    } catch (err) {
        self.postMessage({ ok: false, error: String(err) });
    }
};
