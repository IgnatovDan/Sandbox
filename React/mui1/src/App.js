import React from 'react';
import { Button, Autocomplete, TextField, ButtonGroup, Checkbox, Box, Stack, Slider } from '@mui/material';
// import VolumeDown from '@mui/icons-material/VolumeDown';
// import VolumeUp from '@mui/icons-material/VolumeUp';

function App() {
  // const [sliderValue, setSliderValue] = React.useState();
  // const handleSliderChange = (e, newValue) => {
  //   setSliderValue(newValue);
  // };

  return (
    <div className="App">
      <Button variant='contained'>Click me</Button>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ ['The Shawshank Redemption', 'The Godfather'] }
        sx={ { width: 300 } }
        renderInput={ (params) => <TextField { ...params } label="Movie" /> }
      />

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>Touch</Button>
        <Button>&</Button>
        <Button>Go</Button>
      </ButtonGroup>

      <Checkbox style={ { display: 'block' } } inputProps={ { 'aria-label': 'Checkbox demo' } } defaultChecked color="success" />

      {/* <Box sx={ { width: 200 } }>
        <Stack spacing={ 2 } direction="row" sx={ { mb: 1 } } alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" value={ sliderValue } onChange={ handleSliderChange } />
          <VolumeUp />
        </Stack>
        <Slider disabled defaultValue={ 30 } aria-label="Disabled slider" />
      </Box> */}
    </div>
  );
}

export default App;
