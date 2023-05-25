using Microsoft.AspNetCore.Mvc;
using WasmDxXlsx.Server.Services;

namespace WasmDxXlsx.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GenerateXlsxFileController : ControllerBase
{
    private XlsxFileGeneratorService xlsxGenerator;
    public GenerateXlsxFileController(XlsxFileGeneratorService xlsxGenerator) {
        this.xlsxGenerator = xlsxGenerator;
    }
    [HttpGet]
    public FileResult Get() {
        return File(
            xlsxGenerator.GenerateXlsxFile(),
            WasmDxXlsx.Server.Utils.MediaTypeNames.Xlsx,
            "DxWorkbook.xlsx"
        );
    }
}
