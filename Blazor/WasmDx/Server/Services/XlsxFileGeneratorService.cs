using CoreLib;

namespace WasmDx.Server.Services;

public class XlsxFileGeneratorService {
  XlsxFileGenerator xlsxFileGenerator = new XlsxFileGenerator();

  public Task<byte[]> GenerateXlsxFileAsync() {
    return xlsxFileGenerator.GenerateXlsxFileAsync();
  }
}
