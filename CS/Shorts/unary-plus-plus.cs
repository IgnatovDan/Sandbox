/*
  it looks like https://stackoverflow.com/questions/43539718/interesting-interview-exercise-result-return-post-increment-and-ref-behavior
  static void Main(){
    int i = 0;
    i += Increment(ref i);
    Console.WriteLine(i); // 0
  }
  static private int Increment(ref int i)  {
    return i++;
  }
*/

int[] l = { 1, 2, 3, 4, 5 };
Console.WriteLine(l.Count().ToString());
//5

int i = 0;
var filtered = l.Where(item => item > 2).Select(_ => i++);

int i2 = 0;
var filtered2 = l.Where(item => item > 2).Select(_ => {
  return i2++;
});

Console.WriteLine("i: " + i + ", i2: " + i2);
//i: 0, i2: 0

var list = filtered.ToList();
var list2 = filtered2.ToList();

Console.WriteLine("i: " + i + ", i2: " + i2);
//i: 3, i2: 3
Console.WriteLine("list.Count: " + list.Count() + ", list2.Count: " + list2.Count());
//list.Count: 3, list2.Count: 3

var f1 = list.FirstOrDefault();
Console.WriteLine("i: " + i + ", f1 = " + f1 + ", list[0]: " + list[0] + ", list[1]: " + list[1]);
//i: 3, f1 = 0, list[0]: 0, list[1]: 1

var f2 = list2.FirstOrDefault();
Console.WriteLine("i2: " + i + ", f2 = " + f2 + ", list2[0]: " + list2[0] + ", list2[1]: " + list2[1]);
//i2: 3, f2 = 0, list2[0]: 0, list2[1]: 1
