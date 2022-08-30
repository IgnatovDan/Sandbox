import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { validateBemJsZip } from './api/validate-bem/validate-bem';

import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleFileChange = useCallback((e) => {
    JSZip.loadAsync(e.target.files[0])
      .then(function(zipContent) {
        // const zip = new JSZip();
        // zip.folder('vendor').folder('fonts').file('fonts.css', '');
        // zip.folder('otherFolder').file('fonts.css', '');
        // debugger;
        // validateBemJsZip(zip, { 'fonts.css': { path: true } });

        const messages = validateBemJsZip(zipContent);
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
        <div className="check-results">
          {
            messages.map(message => {
              return (
                <p key={ message.code }>
                  { message.text }
                </p>
              );
            })
          }
        </div>
      </main>
    </div>
  );
}

export default App;
