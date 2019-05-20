let loaded= false;

export default function(state=loaded, action){
  switch (action.type) {
    case "FONT_LOADED": loaded = true;
      break;
  }
  return loaded;
}