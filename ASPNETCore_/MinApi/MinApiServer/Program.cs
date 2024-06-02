var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/{msg}", (string msg) => $"Client message: {msg}");

app.Run();
