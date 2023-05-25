using System.Globalization;
using DevExpress.Spreadsheet;
using DevExpress.Spreadsheet.Functions;

namespace XlsxGenerator;

public class MyFunc1 : ICustomFunction
{
  public string Name => "MYFUNC1";
  public ParameterType ReturnType => ParameterType.Value;
  public ParameterInfo[] Parameters => new ParameterInfo[] { };
  public bool Volatile => false;

  public ParameterValue Evaluate(IList<ParameterValue> parameters, EvaluationContext context)
  {
    return "Hi, people!";
  }

  public string GetName(CultureInfo culture)
  {
    return this.Name;
  }
}

public class XlsxFileGenerator
{
  public byte[] GenerateXlsxFile()
  {
    using var wb = new Workbook();

    MyFunc1 myFunc1 = new MyFunc1();
    if (!wb.Functions.GlobalCustomFunctions.Contains(myFunc1.Name))
    {
      wb.Functions.GlobalCustomFunctions.Add(myFunc1);
    }
    wb.DocumentSettings.Calculation.EnableMultiThreading = false;
    wb.DocumentSettings.Calculation.Mode = CalculationMode.Automatic;

    wb.BeginUpdate();

    var ws = wb.Worksheets[0];
    ws.Cells["A1"].Value = "hello worl";
    ws.Cells["A3"].FormulaInvariant = "=MYFUNC1()";

    wb.EndUpdate();
    //wb.CalculateFullRebuild();
    wb.Calculate();

    ws.Cells["A5"].Value = ws.Cells["A3"].Value; // assign a calculated value from custom function
    //ws.Cells["A5"].Value = ws.Cells["A3"].GetRichText;

    byte[] bytes = wb.SaveDocument(DocumentFormat.Xlsx);

    return bytes;
  }
}
