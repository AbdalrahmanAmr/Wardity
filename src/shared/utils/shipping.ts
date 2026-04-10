const FREE_SHIPPING_THRESHOLD = 1000;

const AREA_SHIPPING_RATES: Record<string, number> = {
  "Nasr City": 30,
  "5th Settlement": 40,
  "3rd Settlement": 40,
  "1st Settlement": 45,
  "Rehab City": 50,
  "Heliopolis": 35,
  "Maadi": 45,
  "Downtown": 35,
  "Other": 60,
};

const DEFAULT_RATE = 60;

export function calculateShipping(subtotal: number, area: string): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return AREA_SHIPPING_RATES[area] ?? DEFAULT_RATE;
}

export function getShippingRate(area: string): number {
  return AREA_SHIPPING_RATES[area] ?? DEFAULT_RATE;
}

export function getDeliveryAreas(): Array<{ name: string; rate: number }> {
  return Object.entries(AREA_SHIPPING_RATES).map(([name, rate]) => ({
    name,
    rate,
  }));
}

export { FREE_SHIPPING_THRESHOLD };
