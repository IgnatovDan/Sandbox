// Top level 'main' - https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements

// See https://aka.ms/new-console-template for more information

//Console.WriteLine("Hello, World!");
// var name = Console.ReadLine();
// var currentDate = DateTime.Now;
// Console.WriteLine($"{Environment.NewLine}Hello, {name}! Today is {currentDate:d}, time is {currentDate:t}");
// Console.WriteLine("Press any key to exit");
// Console.ReadKey(true);

  // Enable UTF8 to show RU chars in console and VSCode terminal
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("> GetCurrencies_HttpClient_GetStringAsync");
await GetCurrencies_HttpClient_GetStringAsync.Main.Run();
Console.WriteLine("");

//await GetCurrencies_HttpClient_ReadAsAsync.Main.Run();

// server returns XML only
// Console.WriteLine("> GetCurrencies_HttpClient_GetFromJsonAsync");
// await GetCurrencies_HttpClient_GetFromJsonAsync.Main.Run();
// Console.WriteLine("< GetCurrencies_HttpClient_GetFromJsonAsync");
// Console.WriteLine("");

Console.WriteLine("> GetCurrencies_HttpClient_XmlSerializer_v3");
await GetCurrencies_HttpClient_XmlSerializer_v3.Main.Run();
Console.WriteLine("");
