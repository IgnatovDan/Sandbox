function SaveAsFile(fileName, byteBase64) {
  var link = document.createElement('a');
  link.download = fileName;

  /*
  const file = new File([data], filename, {{ type: contentType }});
  const exportUrl = URL.createObjectURL(file);
  a.href = exportUrl;
  a.target = '_blank';
  */
  link.href = "data: application / vnd.openxmlformats - officedocument.spreadsheetml.sheet;" +
    "base64, " + byteBase64;  
            
  document.body.appendChild(link);
  link.click();
  link.remove(); // setTimeout, URL.revokeObjectURL(url);
}
