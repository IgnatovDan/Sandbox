async Task<int> AsyncFunc()
{
  int i = 0;
  Console.WriteLine("async: " + i);
  await Task.Delay(1000);
  i += 1;
  Console.WriteLine("async: " + i);
  return i;
}

var t = AsyncFunc();
Console.WriteLine("out1");
Console.WriteLine("out2: " + t.Result);

//async: 0
//out1
//async: 1
//out2: 1
