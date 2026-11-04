// Разовая проверка JSON-LD из prerendered HTML (schema-правки BoardCategoryPage)
const fs = require("fs");

function check(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1]));
  const product = blocks.find((s) => s["@type"] === "Product");
  if (!product) return console.log(htmlPath, "NO PRODUCT");
  const problems = [];
  if (!product.brand || product.brand["@type"] !== "Brand" || !product.brand.name)
    problems.push("no brand");
  for (const [i, o] of product.offers.entries()) {
    const sd = o.shippingDetails;
    const rp = o.hasMerchantReturnPolicy;
    if (!sd || sd["@type"] !== "OfferShippingDetails") problems.push(`offer ${i}: no shippingDetails`);
    else if (!sd.shippingRate || !sd.shippingDestination || !sd.deliveryTime) problems.push(`offer ${i}: shippingDetails incomplete`);
    if (!rp || rp["@type"] !== "MerchantReturnPolicy") problems.push(`offer ${i}: no returnPolicy`);
    else if (!rp.applicableCountry || !rp.returnPolicyCategory || !rp.merchantReturnDays || !rp.returnMethod || !rp.returnFees)
      problems.push(`offer ${i}: returnPolicy incomplete`);
  }
  console.log(htmlPath);
  console.log(`  brand=${product.brand ? product.brand.name : "MISSING"} offers=${product.offers.length}`);
  console.log(problems.length ? `  PROBLEMS: ${problems.join("; ")}` : "  OK: brand + shippingDetails + returnPolicy in every offer");
}

check(".next/server/app/doski/razdelochnye.html");
check(".next/server/app/doski/menazhnitsy.html");
