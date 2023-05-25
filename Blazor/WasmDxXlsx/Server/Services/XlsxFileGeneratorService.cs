using XlsxGenerator;

namespace WasmDxXlsx.Server.Services;

public class XlsxFileGeneratorService
{
  XlsxFileGenerator xlsxFileGenerator = new XlsxFileGenerator();
  public byte[] GenerateXlsxFile()
  {
    return xlsxFileGenerator.GenerateXlsxFile();
  }
}
