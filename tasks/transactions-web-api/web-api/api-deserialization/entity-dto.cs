namespace entity_store;

/*
From brief:

1. Данные в сервис передаются в виде json-строки:
{"id":"cfaa0d3f-7fea-4423-9f69-ebff826e2f89","operationDate":"2019-04-02T13:10:20.0263632+03:00","amount":23.05}

Value of the 'operationDate' field contains 'time offset'.
To deserialize it into a UTC datetime, I will declare a new class with the 'DateTimeOffset OperationDate { get; set; }' member.
(Or, I can introduce a custom deserializer for the 'Entity.OperationDate' member which contains a 'DateTime' value)

2. Пример запроса к сервису:
http://127.0.0.1:5000?insert={"id":"cfaa0d3f-7fea-4423-9f69-ebff826e2f89","operationDate":"2019-04-02T13:10:20.0263632+03:00","amount":23.05 }

URI is incorrect because it contains the NOT encoded special symbol `+` in the query part.
The `+` will be replaced with ` ` (space) and server handler will receive the "2019-04-02T13:10:20.0263632 03:00" string
which is incorrect and an error occurs: "The JSON value could not be converted to System.Nullable`1[System.DateTimeOffset]. Path: $.operationDate | LineNumber: 0 | BytePositionInLine: 96."
See `Test__IncorrectBriefUrlWithPlusSign` for more details.

So, server will handle such query in an unexpected way (save data with an incorrect `operationDate`) or will return the BadRequest/ServerError result code.
Values for the `insert` parameter should be encoded: I used `Uri.EscapeDataString` in tests and `Uri.UnescapeDataString` in server code.

*/

public class InputEntityDTO {
  public Guid Id { get; set; } = Guid.NewGuid();
  public DateTimeOffset? OperationDate { get; set; }
  public decimal Amount { get; set; }

  public Entity ConvertToEntity() {
    return new Entity {
      Id = this.Id,
      OperationDate = this.OperationDate?.UtcDateTime,
      Amount = this.Amount
    };
  }
}
