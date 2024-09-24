export default function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PNP",
  }).format(price);
}
