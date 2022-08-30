import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { runChecksForJsZip } from './api/bem-checker';

import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleFileChange = useCallback((e) => {
    JSZip.loadAsync(e.target.files[0])
      .then(function(zipContent) {
        // const zip = new JSZip();
        // zip.folder('vendor').folder('fonts').file('fonts.css', '');
        // debugger;
        // runChecksForJsZip(zip, { 'fonts.css': { path: true } });

        const messages = runChecksForJsZip(zipContent, { 'fonts.css': { path: true } });
        debugger;
        setMessages(messages);
      });
  }, []);

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
        <p className="check-results">
          {
            messages.map(message => {
              return (
                <p>
                  { message.text }
                </p>
              );
            })
          }
        </p>
      </main>
    </div>
  );
}

export default App;
