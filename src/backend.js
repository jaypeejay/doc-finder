import $ from 'jquery';


export class ApiCall{
  newDataCall(symptom,array){
    return new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    let lat = array[0];
    let lng = array[1];
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=${lat}%2C${lng}%2C100&user_location=${lat}%2C${lng}&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
    request.onload = function(){
      if (this.status == 200){
        resolve(request.response);
      } else{
        reject(Error(request.statusText));
      }
    };
      request.open("GET", url, true);
      request.send();
    });
  }

    locationCall(location){
      return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key= ${process.env.exports.locationApi}`;
      request.onload = function(){
        if (this.status === 200){
          resolve(request.response);
        } else{
          reject(Error(request.statusText));
        }
      };
        request.open("GET", url, true);
        request.send();
      });
    }
  }

export function parseData(input){
  const data = input.data;
  const output = [];
  data.forEach(function(obj){
    output.push(obj.practices[0].name,obj.practices[0].phones[0].number,obj.practices[0].visit_address.street,obj.practices[0].visit_address.city,obj.practices[0].visit_address.state,`Accepting new patients: ${obj.practices[0].accepts_new_patients}`);
    if(obj.practices[0].website){
      output.push(`<a href='${obj.practices[0].website}'>${obj.practices[0].website}</a>` );
    }
  });
  return output;
}

export function parseString(string){
  let output = [];
  for (let i=0;i<string.length;i++){
    output.push(string[i] + '<br>');
  }
  return output;
}
