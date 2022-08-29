import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import './App.css';
import { convertFromJSZipContent } from './api/bem-checker/utils/convert-from-jszip-files';
import { runChecks } from './api/bem-checker';

function App() {
  const handleFileChange = useCallback((e) => {
    JSZip.loadAsync(e.target.files[0])
      .then(function(zipContent) {
        const files = convertFromJSZipContent(zipContent);
        // TODO: runChecks();
      });
  });

  return (
    <div className="App">
      <main className="app-main">
        <form >
          <label>
            Select ZIP archive with sources
            <input type="file" accept=".zip" onChange={ handleFileChange }></input>
          </label>
          {/* <button className="check-sources" type="submit">Check sources</button> */ }
        </form>
        <p className="check-results"></p>
      </main>
    </div>
  );
}

export default App;
