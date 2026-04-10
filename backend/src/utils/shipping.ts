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

export function calculateShipping(subtotal: number, area?: string): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  if (!area) return AREA_SHIPPING_RATES["Other"];
  return AREA_SHIPPING_RATES[area] ?? AREA_SHIPPING_RATES["Other"];
}

export { FREE_SHIPPING_THRESHOLD, AREA_SHIPPING_RATES };
