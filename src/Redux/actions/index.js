  export function showFont(){
    return{
      type: "FONT_LOADED"
    };
  }

  export function roundTrip(){
    return{
      type: "ROUND_TRIP_TRUE"
    };
  }


  export function onewayTrip(){
    return{
      type: "ROUND_TRIP_FALSE"
    };
  }

  export function increase(){
    return{
      type: "INCREASE_BY_ONE"
    };
  }

  export function decrease(){
    return{
      type: "DECREASE_BY_ONE"
    };
  }