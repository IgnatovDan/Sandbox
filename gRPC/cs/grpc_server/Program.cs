using grpc_server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
// [Configure gRPC-Web in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/grpc/grpcweb?view=aspnetcore-8.0#configure-grpc-web-in-aspnet-core)
app.MapGrpcService<GreeterService>().EnableGrpcWeb();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.UseGrpcWeb();

app.Run();
