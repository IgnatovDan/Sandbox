using System.Globalization;
using DevExpress.Spreadsheet.Functions;

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
