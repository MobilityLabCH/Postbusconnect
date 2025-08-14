export function priceCHF(model: { type: 'flat'|'per_passenger'; amount_chf: number }, pax: number) {
  if (model.type === 'flat') return model.amount_chf;
  return Math.round(model.amount_chf * pax * 100) / 100;
}
