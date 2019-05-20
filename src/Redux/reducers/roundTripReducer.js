let roundDate= false;

export default function(state=roundDate, action){
  switch (action.type) {
    case "ROUND_TRIP_TRUE": roundDate = true;
      break;
      case "ROUND_TRIP_FALSE": roundDate = false;
      break;
  }
  return roundDate;
}