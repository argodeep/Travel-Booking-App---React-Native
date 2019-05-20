let person= 0;

export default function(state=person, action){
  switch (action.type) {
    case "INCREASE_BY_ONE": person = person + 1;
      break;
      case "DECREASE_BY_ONE": person = person - 1;
      break;
  }
  return person;
}