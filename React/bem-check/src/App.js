import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { validateBemJsZip } from './api/validate-bem/validate-bem';

import './App.css';
import { validateFileExists } from './api/validate-bem/utils/validate-file-exists/validate-file-exists';
import { validateFolderExists } from './api/validate-bem/utils/validate-folder-exists/validate-folder-exists';

function App() {
  const [messages, setMessages] = useState([]);

  const handleFileChange = useCallback((e) => {
    JSZip.loadAsync(e.target.files[0])
      .then(function(zipContent) {
        // const zip = new JSZip();
        // zip.folder('folder1').folder('vendor').file('fonts.css', '');
    
        // const results = validateBemJsZip(zip,
        //   [(folder) => validateFileExists(folder, 'fonts.css', ['./vendor', './vendor/fonts'], 'test')],
        //   (folder) => {
        //     return folder.containsFolder('vendor');
        //   }
        // );
    
    
        
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
