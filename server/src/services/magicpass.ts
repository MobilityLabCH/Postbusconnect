export async function verifyMagicPass(id: string): Promise<boolean> {
  // TODO: appeler un endpoint partenaire / SSO / code promo
  // v1: stub => considère valide si préfixe MP-
  return /^MP-\w{6,}$/.test(id);
}
