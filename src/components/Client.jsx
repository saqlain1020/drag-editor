import Draggable from 'react-draggable'; // The default
// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoodIcon from '@material-ui/icons/Mood';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CropIcon from '@material-ui/icons/Crop';
import WallpaperIcon from '@material-ui/icons/Wallpaper';


function Client() {

  return (
    <div  className="App" >

      <header className="App-header" style = {{backgroundImage: `url("https://raw.githubusercontent.com/globocom/megadraft/master/website/images/megadraft-cover.jpg")` }} >

      <Draggable>
        <p style = {{ color: '#ebe534', textAlign: 'left' , fontSize:'38px' }}>
          The<br/>
          most rock n'roll<br/>
          text editor ever
        </p>
      </Draggable>
      <Draggable>
        <p style = {{ color: '#ffffff', textAlign: 'left', fontSize:'12px'}}>
        megadraft is a Rich Text editor built on top of <br/>Facebook's draft.js featuring a nice default<br/>base of plugins and extensibility.
        </p>
      </Draggable>

      <Draggable>
      <img src={"https://raw.githubusercontent.com/globocom/megadraft/e83951b32528b685ba6d5b71507d713c467258ee/website/images/md-logo-opm.svg"} width="150" height="150"></img>
      </Draggable>

      <Draggable>
      <p style = {{ color: '#ffffff', textAlign: 'left', fontSize:'14px'}}>
      LET'S ROCK.
        </p>
      </Draggable>

      </header>
      <BottomNavigation >
      <BottomNavigationAction label="Background" value="background" icon={<WallpaperIcon />} />
      <BottomNavigationAction label="Stickers" value="stickers" icon={<MoodIcon />} />
      <BottomNavigationAction label="Text" value="text" icon={<TextFieldsIcon />} />
      <BottomNavigationAction label="Crop" value="crop" icon={<CropIcon />} />
    </BottomNavigation>

    </div>
  );
}

export default Client;
