const SYMBOLE : Record<string, string> =
{
    "BTC/USD": "BTCUSDT",
    "ETH/USD": "ETHUSDT",
};

const KERZEN_MS : Record<string, number> = 
{
    "1m": 60_000,
    "5m": 300_000,
    "1h": 3_600_000,
    "1d": 86_400_000,
};

const MAX_KERZEN = 50_000;

type Kline = [number, string, string, string, string, string, ...unknown[]]

export async function GET(request: Request)
{
    const params = new URL(request.url).searchParams;
    const asset = params.get("asset") ?? "";
    const startdatum = params.get("startdatum") ?? "";
    const enddatum = params.get("enddatum") ?? "";
    const kerzengroesse = params.get("kerzengroesse") ?? "";

    const symbol = SYMBOLE[asset];
    const kerzeMs = KERZEN_MS[kerzengroesse];
    const start = Date.parse(startdatum);
    const ende = Date.parse(enddatum) + 86_400_000 - 1;

    if (!symbol || !kerzeMs || isNaN(start) || isNaN(ende) || start > ende){
        return new Response("Ungültige Filterangaben", {status: 400});
    }

    if ((ende - start) / kerzeMs > MAX_KERZEN) {
        return new Response("Zeitraum ist zu groß für diese Kerzengröße.", {status: 400});
    }

    const zeilen = ["zeit,open,high,low,close,volume"];
    let von = start

    while (von <= ende) {
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${kerzengroesse}&startTime=${von}&endTime=${ende}&limit=1000`
        const antwort = await fetch(url);
        if (!antwort.ok) {
            return new Response("Datenquelle nicht erreichbar.", { status: 502});
        }
        const kerzen: Kline[] = await antwort.json();
        if (kerzen.length === 0) break;

        for (const [zeit, open, high, low, close, volume] of kerzen) {
            zeilen.push([new Date(zeit).toISOString(), open, high,low, close, volume].join(","));
        }
        von = kerzen[kerzen.length - 1][0] + 1;
    }

    const dateiname = `${symbol}_${kerzengroesse}_${startdatum}_${enddatum}.csv`

    return new Response(zeilen.join("\n"), {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${dateiname}"`,
        },
    });
}