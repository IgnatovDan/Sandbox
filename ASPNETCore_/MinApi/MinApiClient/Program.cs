namespace MinApiClient;

class Program
{
    private static async Task<string> TryQueryServer(string serverAddress)
    {
        Console.WriteLine("Starting request...");

        var handler = new SocketsHttpHandler
        {
            ConnectTimeout = TimeSpan.FromSeconds(15)
        };
        using HttpClient client = new HttpClient(handler);
        return await client.GetStringAsync($"http://{serverAddress}:5201/test_request");
    }
    static async Task Main(string[] args)
    {
        Console.WriteLine("Starting request...");

        var serverAddress = (args.Length > 0) ? args[0] : "localhost";
        Console.WriteLine("serverAddress: " + serverAddress);

        for (int i = 0; i < 10; i++)
        {
            try
            {
                var responseAsString = await TryQueryServer(serverAddress);
                Console.WriteLine($"Server response: {responseAsString}");
                Console.ReadLine();
                break;
            }
            catch (Exception e)
            {
                // 3 errors until successfull call: "No such host is known. (sandbox_minapiserver_20240601:5201)"
                Console.WriteLine("Error occurs: " + e.Message);
            }
        }
    }
}
