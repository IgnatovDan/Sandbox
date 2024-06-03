// See https://aka.ms/new-console-template for more information
using Grpc.Net.Client;
using Grpc.Net.Client.Web;

using grpc_client;

using Microsoft.Extensions.Logging;

internal class Program {
    private static async Task<string> TryQueryServer(string serverAddress) {
        Console.WriteLine("Starting request...");

        var handler = new GrpcWebHandler(
            GrpcWebMode.GrpcWeb,
            new HttpClientHandler {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            }) {
            HttpVersion = new Version(1, 1)
        };

        var loggerFactory = LoggerFactory.Create(logging => {
            logging.AddConsole();
            logging.SetMinimumLevel(LogLevel.Debug);
        });

        using var channel = GrpcChannel.ForAddress(
            $"http://{serverAddress}:5258",
            new GrpcChannelOptions {
                LoggerFactory = loggerFactory,
                HttpClient = new HttpClient(handler)
            });

        var client = new Greeter.GreeterClient(channel);
        var reply = await client.SayHelloAsync(new HelloRequest { Name = "GreeterClient" });

        return reply.Message;
    }

    private static async Task Main(string[] args) {
        Console.WriteLine("Starting request...");

        var serverAddress = (args.Length > 0) ? args[0] : "localhost";
        Console.WriteLine("serverAddress: " + serverAddress);

        for (int i = 0; i < 10; i++) {
            try {
                var responseAsString = await TryQueryServer(serverAddress);
                Console.WriteLine($"\r\nServer response: {responseAsString}\r\n");
                Console.ReadLine();
                break;
            }
            catch (Exception e) {
                // 3 errors until successfull call: "No such host is known. (sandbox_minapiserver_20240601:5201)"
                Console.WriteLine("\r\nError occurs: " + e.Message + "\r\n");
                Thread.Sleep(1000);
            }
        }
    }
}
