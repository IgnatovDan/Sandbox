var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/xlsxfile", () => {
  return Results.File(
    XlsxFileGenerator.GenerateXlsxFile(),
    "data: application / vnd.openxmlformats - officedocument.spreadsheetml.sheet;",
    "DxWorkbook.xlsx");
});

app.Run();
