// Task description: ![image](https://user-images.githubusercontent.com/2094015/215684403-5abd6f1f-316c-41ae-9bde-a8b14d9416f6.png)

for (let i = 0; i <= 999; i++) {
  for (let j = 0; j <= 999; j++) {
    for (let k = 0; k <= 999; k++) {
      if ((i + j + k) === 2022) {
        const str1 = i.toString().padStart(3, '0');
        const t1 = str1[0], i1 = str1[1], k1 = str1[2];
        const str2 = j.toString().padStart(3, '0');
        const t2 = str2[0], o2 = str2[1], k2 = str2[2];
        const str3 = k.toString().padStart(3, '0');
        const k3 = str3[0], o3 = str3[1], t3 = str3[2];
        if ((t1 !== i1 && t1 !== k1 && i1 !== k1 && t1 != o2 && i1 != o2 && k1 != o2) &&
          (t1 === t2 && t1 === t3) &&
          (k1 === k2 && k1 === k3) &&
          (o2 === o3)) {
          console.log(`${str1}, ${str2}, ${str3}`);
        }
      }
    }
  }
}
