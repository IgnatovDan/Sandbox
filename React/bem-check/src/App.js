import { useCallback, useMemo, useState } from 'react';
import JSZip from 'jszip';
import { validateBemJsZip } from './api/validate-bem/validate-bem';

import './App.css';
import { validateBemConfigs } from './api/validate-bem/validate-bem-configs';
// import { autoGetValidators } from './api/validate-bem/auto-select-validators/auto-select-validators';
// import { createFolderFromJSZip } from './api/validate-bem/create-folder-from-jszip/create-folder-from-jszip';

function App() {
  const [messages, setMessages] = useState([]);
  const [activeValidationConfigName, setActiveValidationConfigName] = useState('autoSelect');

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

        // const zip = new JSZip();
        // zip.folder('pages');
        //     debugger;
        // autoGetValidators(createFolderFromJSZip(zip));

        const messages = validateBemJsZip(zipContent, validateBemConfigs[activeValidationConfigName].validators);
        if (messages.length === 0) {
          setMessages([{ code: 'no validation messages', text: 'There are no validation messages' }]);
        } else {
          setMessages(messages);
        }
      });
  }, [activeValidationConfigName]);

  const setCheckLevelHandler = useCallback(e => {
    debugger;
    setActiveValidationConfigName(e.target.value);
  }, [setActiveValidationConfigName]);

  const selectCheckLevelMarkup = useMemo(() => {
    return (
      <select onChange={ setCheckLevelHandler }>
        {
          Object.keys(validateBemConfigs).map(configName => {
            return (
              <option key={ configName } value={ configName }>
                { validateBemConfigs[configName].caption }
              </option>
            )
          })
        }
      </select>
    );
  }, [setCheckLevelHandler]);

  return (
    <div className="App">
      <main className="app-main">
        <form className="app-main__form">
          <label>
            Select check level: { selectCheckLevelMarkup }
          </label>
          <label>
            Select ZIP archive with sources:
            <input type="file" accept=".zip" onChange={ handleFileChange }></input>
          </label>
          {/* <button className="check-sources" type="submit">Validate</button> */ }
        </form>
        <p>Active validators config: { validateBemConfigs[activeValidationConfigName].caption }</p>
        <ul className="check-results">
          {
            messages.map(message => {
              return (
                <li key={ message.code }>
                  { message.text }
                </li>
              );
            })
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
