using Azure.Messaging.ServiceBus;
using SharedObjects;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace AzureConsoleReceiver {
    class Program {
        static async Task Main(string[] args) {
            Console.WriteLine("Starting...");

            await using(ServiceBusClient client = new ServiceBusClient(Settings.ConnectionString)) {
                ServiceBusProcessor processor = client.CreateProcessor(Settings.Queue1Name);

                processor.ProcessMessageAsync += (ProcessMessageEventArgs args) => {
                    var myObj = JsonSerializer.Deserialize<MyObject>(args.Message.Body.ToString());
                    Console.WriteLine("Received message: " + JsonSerializer.Serialize(myObj));
                    Console.WriteLine("Send 'complete message' request");
                    return args.CompleteMessageAsync(args.Message);
                };

                processor.ProcessErrorAsync += (ProcessErrorEventArgs args) => {
                    Console.WriteLine("Error occurs: " + args.Exception.ToString());
                    return Task.CompletedTask;
                };

                Console.WriteLine("Start listening for new messages...");
                await processor.StartProcessingAsync();

                Console.WriteLine("Press Enter to exit");
                Console.ReadLine();

                await processor.StopProcessingAsync();
            }
        }
    }
}
