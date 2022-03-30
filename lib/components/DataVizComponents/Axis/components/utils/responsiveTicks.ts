export function responsiveTicks(dimensions) {
  const { boundedWidth } = dimensions;
  const mobileS = boundedWidth < 375;
  const mobileM = boundedWidth >= 375 && boundedWidth < 425;
  const mobileL = boundedWidth >= 425 && boundedWidth < 768;
  const tablet = boundedWidth >= 768 && boundedWidth < 1024;
  const laptopS = boundedWidth >= 1024 && boundedWidth < 1440;
  const largerDevices = boundedWidth > 1440;

  if (mobileS) return 8;
  if (mobileM) return 10;
  if (mobileL) return 11;
  if (tablet) return dimensions.boundedWidth / 50;
  if (laptopS) return dimensions.boundedWidth / 50;
  if (largerDevices) return dimensions.boundedWidth / 50;
}
