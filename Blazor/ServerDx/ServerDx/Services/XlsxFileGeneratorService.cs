using CoreLib;

namespace ServerDx.Services;

public class XlsxFileGeneratorService {
  XlsxFileGenerator xlsxFileGenerator = new XlsxFileGenerator();

  public Task<byte[]> GenerateXlsxFileAsync() {
    return xlsxFileGenerator.GenerateXlsxFileAsync();
  }
}
