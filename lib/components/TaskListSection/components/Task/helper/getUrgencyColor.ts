function colorLineGenerator(num: number, color: string, position?: string) {
  let str = "";
  for (let i = 0; i < num; i++) {
    if (position === "end" && i === num - 1) {
      str += ` ${color}`;
    } else {
      str += ` ${color},`;
    }
  }
  return str;
}

function generateBgGradient(numCol1: number, numCol2: number) {
  return `linear(to-r,${colorLineGenerator(
    numCol1,
    "green.400"
  )},${colorLineGenerator(numCol2, "red.400", "end")})`;
}

export function getUrgencyColor(num: number) {
  if (num >= 100) return generateBgGradient(10, 0);
  if (num < 100 && num >= 90) return generateBgGradient(9, 1);
  if (num < 90 && num >= 80) return generateBgGradient(8, 2);
  if (num < 80 && num >= 70) return generateBgGradient(7, 3);
  if (num < 70 && num >= 60) return generateBgGradient(6, 4);
  if (num < 60 && num >= 50) return generateBgGradient(5, 5);
  if (num < 50 && num >= 40) return generateBgGradient(4, 6);
  if (num < 40 && num >= 30) return generateBgGradient(3, 7);
  if (num < 30 && num >= 20) return generateBgGradient(2, 8);
  if (num < 20 && num >= 10) return generateBgGradient(1, 9);
  if (num < 10) return generateBgGradient(0, 10);

  console.log("something went wrong");
}
