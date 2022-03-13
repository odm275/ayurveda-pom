function millisecondsToHours(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours;
}

export function getUrgencyPercentage(createdAt: string, eta: string) {
  const createdAtTime = millisecondsToHours(new Date(createdAt).getTime());
  const etaTime = millisecondsToHours(new Date(eta).getTime());
  const now = millisecondsToHours(new Date().getTime());
  const result = ((etaTime - now) / (etaTime - createdAtTime)) * 100;

  return result;
}
