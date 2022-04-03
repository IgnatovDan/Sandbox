using Azure.Messaging.ServiceBus;
using SharedObjects;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace AzureConsoleSender {
    class Program {
        async static Task Main() {
            List<MyObject> myObjects = new List<MyObject> {
                //new MyObject { Name = "ob1", MyItems = new string[] {"item 1_1", "item 1_2" } },
                //new MyObject { Name = "obj2", MyItems = new string[] {"item 2_1", "item 2_2" } }
                new MyObject { Name = "obj_" + DateTime.Now.ToString("o"), MyItems = new string[] {"item 1", "item 2" } },
            };

            Console.WriteLine("Press Enter to start.");
            Console.ReadLine();

            Console.WriteLine("Starting...");
            await using(ServiceBusClient client = new ServiceBusClient(Settings.ConnectionString)) {
                await using(ServiceBusSender sender = client.CreateSender(Settings.Queue1Name)) {

                    await sender.SendMessagesAsync(
                        myObjects.ConvertAll(obj => {return new ServiceBusMessage(JsonSerializer.Serialize(obj));})
                        );

                    Console.WriteLine("Finished.");
                }
            }

            Console.WriteLine("Press Enter to exit.");
            Console.ReadLine();
        }
    }
}
