namespace MinApiClient;

class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("Starting request...");

        var serverAddress = (args.Length > 0) ? args[0] : "localhost";
        Console.WriteLine("serverAddress: " + serverAddress);
        var responseAsString = "";
        //Thread.Sleep(10000);
        var handler = new SocketsHttpHandler
        {
            ConnectTimeout = TimeSpan.FromSeconds(15)
        };
        HttpClient client = new HttpClient(handler);
        try
        {
            responseAsString = await client.GetStringAsync($"http://{serverAddress}:5201/test_request");
        }
        finally
        {
            client.Dispose();
        }

        Console.WriteLine($"Server response: {responseAsString}");
        Console.ReadLine();
    }
}
