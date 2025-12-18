// Cliente front-end para tu PriceEngine de Node

export interface PriceTick {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: number;
}

type PricesMessage = {
  type: 'prices';
  data: PriceTick[];
};

type PriceMessage = {
  type: 'price';
  data: PriceTick;
};

type IncomingMessage = PricesMessage | PriceMessage;

const HTTP_BASE = import.meta.env.VITE_PRICE_HTTP_URL;   // ej: http://localhost:5055
const WS_URL    = import.meta.env.VITE_PRICE_WS_URL;     // ej: ws://localhost:5055/stream

// Estado interno del cliente
const prices = new Map<string, PriceTick>();
const listeners: Array<(tick: PriceTick) => void> = [];

let ws: WebSocket | null = null;
let requestedSymbols: string[] = [];

/**
 * Conecta el WebSocket y se suscribe a una lista de símbolos.
 * Si ya está conectado, solo envía el mensaje de subscribe.
 */
export function connectPriceStream(symbols: string[]): void {
  requestedSymbols = symbols;

  // Si ya hay un WS abierto o conectándose, solo hacemos subscribe si está OPEN
  if (ws) {
    if (ws.readyState === WebSocket.OPEN) {
      sendSubscribe();
    }
    // Si está CONNECTING, dejamos que onopen haga el subscribe
    return;
  }

  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    sendSubscribe();
  };

  ws.onmessage = (event: MessageEvent) => {
    try {
      const msg = JSON.parse(event.data) as IncomingMessage;

      if (msg.type === 'prices') {
        // Snapshot inicial
        msg.data.forEach((tick) => {
          prices.set(tick.symbol, tick);
          notifyListeners(tick);
        });
      } else if (msg.type === 'price') {
        const tick = msg.data;
        prices.set(tick.symbol, tick);
        notifyListeners(tick);
      }
    } catch (err) {
      console.error('[PriceClient] Error parsing WS message:', err);
    }
  };

  ws.onclose = () => {
    console.warn('[PriceClient] WebSocket cerrado');
    ws = null;
  };

  ws.onerror = (err) => {
    console.error('[PriceClient] WebSocket error:', err);
  };
}

function sendSubscribe(): void {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  if (!requestedSymbols.length) return;

  const msg = {
    type: 'subscribe',
    symbols: requestedSymbols,
  };

  ws.send(JSON.stringify(msg));
}

/**
 * HTTP helper opcional: trae todos los precios actuales.
 * (No es obligatorio si ya usas el snapshot 'prices' del WebSocket)
 */
export async function fetchAllPrices(): Promise<PriceTick[]> {
  const res = await fetch(`${HTTP_BASE}/prices`);
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  const data = (await res.json()) as PriceTick[];
  data.forEach((tick) => prices.set(tick.symbol, tick));
  return data;
}

/**
 * Último precio conocido para un símbolo.
 */
export function getLastPrice(symbol: string): PriceTick | undefined {
  return prices.get(symbol);
}

/**
 * Registrar listener que se ejecuta en cada tick.
 * Devuelve una función para desuscribirse.
 */
export function onPriceTick(listener: (tick: PriceTick) => void): () => void {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notifyListeners(tick: PriceTick): void {
  listeners.forEach((fn) => fn(tick));
}
