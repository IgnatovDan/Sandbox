using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/TransparentProxyReturnParsedString", async (HttpContext context) => {
  return await TransparentProxyReturnParsedString.Main.ProcessRequest(context);
});

app.MapGet("/TransparentProxyReturnResultsStream", async (HttpContext context) => {
  return await TransparentProxyReturnResultsStream.Main.ProcessRequest(context);
});

// swagger doesn't show this api, access it directly
app.MapGet("/TransparentProxyReturnStreamBody", async (HttpContext context) => {
  await TransparentProxyReturnStreamBody.Main.ProcessRequest(context);
});

app.Run();
