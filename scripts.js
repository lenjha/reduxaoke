// LYRIC INFO
const songList = {
  1: "Yeah, can you feel it baby?, I can too, Come on swing it, Come on swing it, Come on swing it, Come on swing it, 1 2 3, Now we come to the pay off, It's such a good vibration, It's such a sweet sensation, It's such a good vibration, It's such a sweet sensation, Yo it's about that time, To bring forth the rhythm and the rhyme, I am a get mine so get your, I wanna see sweat comin out your pores, On the house tip is how I am swinging this, Strictly hip hop boy, I aint singing this, Bringing this to the entire nation, Black white red brown, Feel the vibration, Come on come on, Feel it feel it, Feel the vibration, It's such a good vibration, It's such a sweet sensation, It's such a good vibration, It's such a sweet sensation".split(', '),
  2: "I, I love the colorful clothes she wears, And the way the sunlights plays upon her hair, I hear the sound of a gentle word, On the wind that lifts her perfume through the air, I'm pickin' up good vibrations, She's giving me excitations (Oom bop bop), I'm pickin' up good vibrations (Good vibrations oom bop bop), She's giving me excitations (Excitations oom bop bop), I'm pickin' up good vibrations (Good vibrations oom bop bop), She's giving me excitations (Excitations oom bop bop), Close my eyes she's somehow closer now, Softly smile I know she must be kind, When I look in her eyes, She goes with me to a blossom world, I'm pickin' up good vibrations, She's giving me excitations (Oom bop bop), I'm pickin' up good vibrations (Good vibrations oom bop bop), She's giving me excitations (Excitations oom bop bop), I'm pickin' up good vibrations (Good vibrations oom bop bop), She's giving me excitations (Excitations oom bop bop)".split(', ')
};

// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: 'Good Vibrations',
      artist: 'Marky Mark & the Funky Bunch',
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: 'Good Vibrations',
      artist: 'The Beach Boys',
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
}

//REDUX REDUCER
const lyricChangeReducer = (state = initialState.songsById, action) => {

  // declare several variables used below, without yet defining
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;

  switch (action.type) {
    case 'NEXT_LYRIC':

      // locate the arrayPosition of song whose ID was provided in the action's payload, and increments it by one:
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;

      // creates a copy of the song's entry in the songsById state slice, and adds the updated newArrayPosition value we just calculated as its arrayPosition:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });

      // returns the entire newSongsByIdStateSlice we just constructed, which will update state in our Redux store to match this returned value:
      return newSongsByIdStateSlice;

    case 'RESTART_SONG':

      // creates a copy of the song entry in songsById state slice whose ID matches the currentSongId included with the action, sets the copy's arrayPosition value to 0:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })

      // creates a copy of the entire songsById state slice, and adds the updated newSongsByIdEntry we just created to this copy:
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });

      //returns the entire newSongsByIdStateSlice we just made, which will update the songsById state slice in our Redux store to match the new slice returned:
      return newSongsByIdStateSlice;

      // If action is neither 'NEXT_LYRIC' nor 'RESTART_SONG' type, return existing state:
    default:
      return state;
  }
}

//JEST TESTS + SETUP
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2})).toEqual({
  1: {
    title: 'Good Vibrations',
    artist: 'Marky Mark & the Funky Bunch',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: 'Good Vibrations',
    artist: 'The Beach Boys',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer({
  1: {
    title: 'Good Vibrations',
    artist: 'Marky Mark & the Funky Bunch',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 5,
  },
  2: {
    title: 'Good Vibrations',
    artist: 'The Beach Boys',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
}, { type: 'RESTART_SONG', currentSongId: 1})).toEqual(initialState.songsById);

// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

//RENDERING STATE IN DOM
// const renderLyrics = () => {
//   // defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
//   const lyricsDisplay = document.getElementById('lyrics');
//   // if there are already lyrics in this div, remove them one by one until it is empty:
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   // locates the song lyric at the current arrayPosition:
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//   // creates DOM text node containing the song lyric identified in line above:
//   const renderedLine = document.createTextNode(currentLine);
//   // adds text node created in line above to 'lyrics' div in DOM
//   document.getElementById('lyrics').appendChild(renderedLine);
//   }
//
//
// // runs renderLyrics() method from above when page is finished loading.
// // window.onload is HTML5 version of jQuery's $(document).ready()
// window.onload = function() {
//   renderLyrics();
// }
//
// // CLICK LISTENER
// const userClick = () => {
//   const currentState = store.getState();
//   // determine whether arrayPosition is equal to final index in songLyricsArray
//   if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
//     // if we are on the last lyric of the song, dispatch RESTART_SONG
//     store.dispatch({ type: 'RESTART_SONG' });
//   } else {
//     store.dispatch({ type: 'NEXT_LYRIC' });
//   }
// }
//
// // SUBSCRIBE TO REDUX STORE
// store.subscribe(renderLyrics);
