function SaveAsFile(fileName, byteBase64) {
  var link = document.createElement('a');
  link.download = fileName;
  link.href = "data: application / vnd.openxmlformats - officedocument.spreadsheetml.sheet;" +
    "base64, " + byteBase64;  
            
  document.body.appendChild(link);
  link.click();
  link.remove();
}
