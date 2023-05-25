using Microsoft.AspNetCore.Mvc;

using WasmDx.Server.Services;

namespace WasmDx.Server.Controllers;

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
        WasmDx.Server.Utils.MediaTypeNames.Xlsx,
        "DxWorkbook.xlsx"
    );
  }
}
