export default function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(price);

  return `${formattedPrice} PNP`;
}
