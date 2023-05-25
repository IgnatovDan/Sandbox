using Microsoft.AspNetCore.Mvc;

using ServerDx.Services;

namespace ServerDx.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenerateXlsxFileController : ControllerBase {
  private XlsxFileGeneratorService xlsxGenerator;

  public GenerateXlsxFileController(XlsxFileGeneratorService xlsxGenerator) {
    this.xlsxGenerator = xlsxGenerator;
  }

  [HttpGet]
  public async Task<FileResult> GetAsync() {
    return File(
        await xlsxGenerator.GenerateXlsxFileAsync(),
        ServerDx.Utils.MediaTypeNames.Xlsx,
        "DxWorkbook.xlsx"
    );
  }
}
